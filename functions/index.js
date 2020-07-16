const functions = require('firebase-functions');
const express = require('express');
const app = express();
const {db} = require('./utilities/admin');
const FBAuth = require('./utilities/FBAuth');
//https://asia-east2-socialapp-2c8b0.cloudfunctions.net/api

const cors = require('cors');
app.use(cors());

const {
    getAllPosts, 
    postOnePost, 
    getPost, 
    getFirstSetOfPosts,
    fetchMoreData,
    commentOnPost, 
    deleteComment,
    likePost, 
    unlikePost, 
    likeComment,
    unlikeComment,
    deletePost,
    uploadPostImage,
    getSingleUser } = require('./handlers/posts');
const {
    signup, 
    login, 
    uploadImage, 
    addUserDetails, 
    getAuthenticatedUser,
    getUserDetails,
    markNotificationRead,
    getUsers
    } = require('./handlers/users');

// Posts route
app.get('/posts', getAllPosts);
app.get('/firstSetPosts', getFirstSetOfPosts);
app.get('/fetchMoreData/:last', fetchMoreData);
app.post('/post', FBAuth, postOnePost);
app.get('/post/:postID', getPost);
app.post('/posts/:postID/comment', FBAuth, commentOnPost);
app.delete('/post/:postID/:commentID/comment', FBAuth, deleteComment);
app.get('/post/:postID/like', FBAuth, likePost);
app.get('/post/:postID/unlike', FBAuth, unlikePost);
app.get('/comment/:commentID/like', FBAuth, likeComment);
app.get('/comment/:commentID/unlike', FBAuth, unlikeComment);
app.delete('/post/:postID', FBAuth, deletePost);
app.post('/post/:postID/image', FBAuth, uploadPostImage);
app.get('/users', FBAuth, getUsers);
app.get('/users/:handle', FBAuth, getSingleUser);

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
        return db.doc(`posts/${snapshot.data().postID}`).get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle ) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdTime: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        postID: doc.id,
                        notificationId: snapshot.id
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    });

exports.createNotificationOnLikeComment = functions.region('asia-east2').firestore.document('likes/{id}')
    .onCreate((snapshot) => {
        return db.doc(`comments/${snapshot.data().commentID}`).get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdTime: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'likeComment',
                        read: false,
                        postID: doc.id,
                        notificationId: snapshot.id
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    })

exports.deleteNotificationOnUnlikeComment =  functions.region('asia-east2').firestore.document('likes/{id}')
    .onDelete((snapshot) => {
        return db.doc(`/notifications/${snapshot.id}`)
        .delete()
        .catch(() => {
            return;
        })
    })


exports.deleteNotificationOnUnlike =  functions.region('asia-east2').firestore.document('likes/{id}')
    .onDelete((snapshot) => {
        return db.doc(`/notifications/${snapshot.id}`)
        .delete()
        .catch(() => {
            return;
        })
    })

exports.createNotificationOnComment = functions.region('asia-east2').firestore.document('comments/{id}')
    .onCreate((snapshot) => {
        return db.doc(`posts/${snapshot.data().postID}`).get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdTime: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'comment',
                        read: false,
                        postID: doc.id,
                        notificationId: snapshot.id
                    });
                }
            })
            .catch(err => {
                return;
            });
    });

exports.onUserImageChange = functions.region('asia-east2').firestore.document('/users/{userID}')
    .onUpdate((change) => {
        if (change.before.data().imageUrl !== change.after.data().imageUrl) {
            let batch = db.batch();
            return db.collection('posts').where('userHandle', '==', change.before.data().handle).get()
            .then((data) => {
                data.forEach(doc => {
                    const post = db.doc(`/posts/${doc.id}`);
                    batch.update(post, { userImage: change.after.data().imageUrl });
                })
                return batch.commit();
            })
        } else return true;
    });

exports.onUserImageChangeComment = functions.region('asia-east2').firestore.document('/users/{userID}')
.onUpdate((change) => {
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
        let batch = db.batch();
        return db.collection('comments').where('userHandle', '==', change.before.data().handle).get()
        .then((data) => {
            data.forEach(doc => {
                const comment = db.doc(`/comments/${doc.id}`);
                batch.update(comment, { userImage: change.after.data().imageUrl });
            })
            return batch.commit();
        })
    } else return true;
});

exports.onPostDelete = functions.region('asia-east2').firestore.document('/posts/{postID}')
    .onDelete((snapshot, context) => {
        const postID = context.params.postID;
        const batch = db.batch();
        return db.collection('comments').where('postID', '==', postID).get()
            .then((data) => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/comments/${doc.id}`));
                });
                return db.collection('likes').where('postID', '==', postID).get();
            })
            .then((data) => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/likes/${doc.id}`));
                });
                return db.collection('notifications').where('postID', '==', postID).get();
            })
            .then((data) => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                });
                return batch.commit();
            })
            .catch(err => console.error(err));
    })
