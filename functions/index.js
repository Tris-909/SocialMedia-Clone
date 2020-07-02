const functions = require('firebase-functions');
const express = require('express');
const app = express();

const FBAuth = require('./utilities/FBAuth');

const {getAllPosts, postOnePost} = require('./handlers/posts');
const {signup, login, uploadImage, addUserDetails, getAuthenticatedUser} = require('./handlers/users');

// Posts route
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, postOnePost);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

//login and signup
app.post('/signup', signup);
app.post('/login', login);


exports.api = functions.region('asia-east2').https.onRequest(app);  