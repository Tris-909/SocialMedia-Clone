const functions = require('firebase-functions');
const express = require('express');
const app = express();

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
    getAuthenticatedUser} = require('./handlers/users');

// Posts route
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, postOnePost);
app.get('/post/:postID', getPost);
app.post('/posts/:postID/comment', FBAuth, commentOnPost);
app.get('/post/:postID/like', FBAuth, likePost);
app.get('/post/:postID/unlike', FBAuth, unlikePost);
app.delete('/post/:postID', FBAuth, deletePost);
// TODO : DELETE POST

app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

//login and signup
app.post('/signup', signup);
app.post('/login', login);


exports.api = functions.region('asia-east2').https.onRequest(app);  