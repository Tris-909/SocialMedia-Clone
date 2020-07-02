const { db } = require('../utilities/admin');
const config = require('../utilities/config');
const firebase = require('firebase');

firebase.initializeApp(config)

const { validateSignUpData, validateLogInData } = require('../utilities/Validator');

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle 
    }

    const { valid, errors } = validateSignUpData(newUser);
    
    if (!valid) return res.status(400).json(errors);

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
}

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLogInData(user);
    
    if (!valid) return res.status(400).json(errors);

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
}