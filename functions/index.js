const functions = require('firebase-functions');
const express = require('express');
const app = express();
const {db} = require('./utilities/admin');
const FBAuth = require('./utilities/FBAuth');

const {
    getAllPosts, 
    postOnePost, 
    getPost, 
    commentOnPost, 
    likePost, 
    unlikePost,
    deletePost} = require('./handlers/posts');
const {
    signup, 
    login, 
    uploadImage, 
    addUserDetails, 
    getAuthenticatedUser,
    getUserDetails,
    markNotificationRead
    } = require('./handlers/users');

// Posts route
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, postOnePost);
app.get('/post/:postID', getPost);
app.post('/posts/:postID/comment', FBAuth, commentOnPost);
app.get('/post/:postID/like', FBAuth, likePost);
app.get('/post/:postID/unlike', FBAuth, unlikePost);
app.delete('/post/:postID', FBAuth, deletePost);

app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications',FBAuth, markNotificationRead);
//login and signup
app.post('/signup', signup);
app.post('/login', login);


exports.api = functions.region('asia-east2').https.onRequest(app);  

exports.createNotificationOnLike = functions.region('asia-east2').firestore.document('likes/{id}')
    .onCreate((snapshot) => {
        db.doc(`posts/${snapshot.data().postID}`).get()
            .then(doc => {
                if (doc.exists) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdTime: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        postID: doc.id
                    });
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                return;
            });
    });

exports.deleteNotificationOnUnlike =  functions.region('asia-east2').firestore.document('likes/{id}')
    .onDelete((snapshot) => {
        db.doc(`/notifications/${snapshot.id}`)
        .delete()
        .then(() => {
            return;
        })
        .catch(() => {
            return;
        })
    })

exports.createNotificationOnComment = functions.region('asia-east2').firestore.document('comments/{id}')
    .onCreate((snapshot) => {
        db.doc(`posts/${snapshot.data().postID}`).get()
            .then(doc => {
                if (doc.exists) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdTime: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'comment',
                        read: false,
                        postID: doc.id
                    });
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                return;
            });
    });

