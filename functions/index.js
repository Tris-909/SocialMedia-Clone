const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyD0tFUUX6Xut-RPSWDOD6ff9Yu6pDMa12Y",
    authDomain: "socialapp-2c8b0.firebaseapp.com",
    databaseURL: "https://socialapp-2c8b0.firebaseio.com",
    projectId: "socialapp-2c8b0",
    storageBucket: "socialapp-2c8b0.appspot.com",
    messagingSenderId: "218503334984",
    appId: "1:218503334984:web:3d3f40787b355c46be5c7d",
    measurementId: "G-B5MJ5MKF51"
};

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get('/posts', (req, res) => {
    admin.firestore().collection('posts').get()
    .then(data => {
        let posts = [];
        data.forEach(doc => {
            posts.push({
                postID: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdTime: doc.data().createdTime
            });
        });
        return res.json(posts);
    })
    .catch(err => console.log(err));
})

const FBAuth = (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.log("No token found");
        return res.status(403).json({ error: 'UnAuthorized'});
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            console.log(decodedToken);
            return db.collection('users').where('userID', '==', req.user.uid).limit(1).get();
        })
        .then(data => {
            req.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch(err => {
            console.error('Error while verifying token', err);
            return res.status(403).json(err);
        })
}
// 1:31:11 got stuck on FBAuth                                                
app.post('/post', FBAuth, (req, res ) => {    
    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty' });
    }
    
    const newPosts = {  
        body: req.body.body,
        userHandle: req.user.handle,
        createdTime: new Date().toISOString()
    };
    
    db.collection('posts')
        .add(newPosts)
        .then((doc) => {
            res.json({message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong'});
            console.error(err);
        });
});

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
}

const isEmpty = (string) => {
    if (string.trim() === '') return true; 
    else return false;
}

app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle 
    }
    let error = {};
    if (isEmpty(newUser.email)) {
        error.email = "Must not be empty";
    } else if (!isEmail(newUser.email)) {
        error.email = "Must be a valid email address";
    }

    if (isEmpty(newUser.password)) {
        error.password = "Must not be empty";
    } 
    if (newUser.password !== newUser.confirmPassword) { 
        error.confirmPassword = "Password is not matched"
    }
    if (isEmpty(newUser.handle)) {
        error.handle = "Must not be empty";
    } 

    if (Object.keys(error).length > 0) {
        return res.status(400).json(error);
    }


    // VALIDATE DATA
    let token, userId;

    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ handle: 'this handle is already taken'});
            } else {
                return firebase
                .auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(idToken => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdTime: new Date().toISOString(),
                userID: userId
            };
            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch(err => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                return res.status(400).json({ email: 'Email is already registered'})
            } else {
                return res.status(500).json({ error: err.code });
            }
        })
})

app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    let errors = {};

    if (isEmpty(user.email)) {
        errors.email = "Must not be empty";
    }
    
    if (isEmpty(user.password)) {
        errors.password = "Must not be empty";
    }

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
        return data.user.getIdToken();
    })
    .then(token => {
        return res.json({token});
    })
    .catch(err => {
        console.error(err);
        if (err.code === "auth/wrong-password") {
            return res.status(403).json({general: 'Wrong Credentials, please try again'});
        } else {
            return res.status(500).json({error: err.code}); 
        }
    });
});

exports.api = functions.region('asia-east2').https.onRequest(app);