const functions = require('firebase-functions');
const express = require('express');
const app = express();

const FBAuth = require('./utilities/FBAuth');

const {getAllPosts, postOnePost} = require('./handlers/posts');
const {signup, login, uploadImage} = require('./handlers/users');

// Posts route
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, postOnePost);

//login and signup
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth ,uploadImage)

exports.api = functions.region('asia-east2').https.onRequest(app);  