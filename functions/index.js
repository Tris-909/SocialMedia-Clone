const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();


app.get('/posts', (req, res) => {
    admin.firestore().collection('posts').get()
    .then(data => {
        let posts = [];
        data.forEach(doc => {
            posts.push(doc.data());
        });
        return res.json(posts);
    })
    .catch(err => console.log(err));
})

exports.createPosts = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        return res.status(400).json({error: "Method not allowed"});
    }
    
    const newPosts = {
        body: request.body.body,
        userHandle: request.body.userHandle,
        createdTime: admin.firestore.Timestamp.fromDate(new Date())
    };
    
    admin.firestore()
        .collection('posts')
        .add(newPosts)
        .then((doc) => {
            res.json({message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong'});
            console.error(err);
        });
});

exports.api = functions.https.onRequest(app);