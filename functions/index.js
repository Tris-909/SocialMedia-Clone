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

app.post('/posts', (request, res) => {    
    const newPosts = {
        body: request.body.body,
        userHandle: request.body.userHandle,
        createdTime: new Date().toISOString()
    };
    
    db
        .collection('posts')
        .orderBy('createdAt', 'desc')
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