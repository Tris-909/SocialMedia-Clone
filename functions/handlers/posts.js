const {admin, db} = require('../utilities/admin');
const config = require('../utilities/config');


exports.getAllPosts = (req, res) => {
    db.collection('posts')
    .orderBy('createdTime', 'desc')
    .get()
    .then(data => {
        let posts = [];
        data.forEach(doc => {
            posts.push({
                postID: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdTime: doc.data().createdTime,
                commentCount: doc.data().commentCount,
                likeCount: doc.data().likeCount,
                userImage: doc.data().userImage,
                imagePostUrl: doc.data().imagePostUrl
            });
        });
        return res.json(posts);
    })
    .catch( (err) => {
        console.log(err);
        res.status(500).json({ error: err.code });
    });
}


exports.getPost = (req, res) => {
    let postData = {};
    db.doc(`/posts/${req.params.postID}`)
        .get()
        .then(doc => {
            if (!doc.exists){
                return res.status(404).json({error: 'Post not found'})
            }
            postData = doc.data();
            postData.postID = doc.id;
            return db.collection('comments').where('postID', '==', req.params.postID).get();
        })
        .then(data => {
            postData.comments = [];
            data.forEach(doc => {
                postData.comments.push(
                    {...doc.data(),
                    commentID: doc.id
                    });
            });
            // if (postData.comments.length > 0) {
            //     postData.comments.map(comment => {
            //         comment[commentID] = doc.id;
            //     });
            // }
            return res.json(postData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
}

exports.uploadPostImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({ headers: req.headers });

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({ error: 'Wrong file type submitted' });
        }
        
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(Math.random() * 100000000)}.${imageExtension}`; 
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
        .then(() => {
            const imagePostUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
            return db.doc(`/posts/${req.params.postID}`).update({ imagePostUrl: imagePostUrl });
        })
        .then(() => {
            return res.json({ message: 'Image uploaded Successfully' }); 
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error : err.code});
        })
    });
    busboy.end(req.rawBody);
}

exports.postOnePost = (req, res ) => {    
    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty' });
    }

    const newPosts = {  
        body: req.body.body,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        createdTime: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0
    };
    
    db.collection('posts')
        .add(newPosts)
        .then((doc) => {
            const resPost = newPosts;
            resPost.postID = doc.id;
            res.json(resPost);
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong'});
            console.error(err);
        });
}

exports.commentOnPost = (req, res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({ comment: 'Command must not be empty'});
    }

    const newComment = {
        body: req.body.body,
        createdTime: new Date().toISOString(),
        postID: req.params.postID,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl
    };

    db.doc(`/posts/${req.params.postID}`).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({error: 'This Post Is Not Exist'});
            }
            return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
        })
        .then(() => {
            return db.collection('comments').add(newComment);
        })
        .then(() => {
            res.json(newComment);
        })
        .catch(err => {
            res.status(500).json({error: 'Something went wrong'});
        });
}

exports.likePost = (req, res) => {
    const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle)
    .where('postID', '==', req.params.postID).limit(1);

    const postDocument = db.doc(`/posts/${req.params.postID}`);

    let postData;

    postDocument.get()
        .then(doc => {
            if (doc.exists){
                postData = doc.data();
                postData.postID = doc.id;
                return likeDocument.get(); 
            } else {
                return res.status(400).json({error: 'Post not found'});
            }
        })
        .then(data => {
            if (data.empty) {
                return db.collection('likes').add({
                    postID:  req.params.postID,
                    userHandle: req.user.handle
                })
                .then(() => {
                    postData.likeCount++;
                    return postDocument.update({ likeCount: postData.likeCount });
                })
                .then(() => {
                    return res.json(postData);
                })
            } else {
                return res.status(400).json({ error: 'This post is already liked by the user'});
            }
        })
        .catch(error => {
            res.status(500).json({error: err.code});
        })
};

exports.unlikePost = (req, res) => {
    const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle)
    .where('postID', '==', req.params.postID).limit(1);

    const postDocument = db.doc(`/posts/${req.params.postID}`);

    let postData;

    postDocument.get()
        .then(doc => {
            if (doc.exists){
                postData = doc.data();
                postData.postID = doc.id;
                return likeDocument.get(); 
            } else {
                return res.status(400).json({error: 'Post not found'});
            }
        })
        .then(data => {
            if (data.empty) {
                return res.status(400).json({ error: 'This post is not liked by the user'});
            } else {
                return db.doc(`/likes/${data.docs[0].id}`).delete()
                    .then(() => {
                        postData.likeCount--;
                        return postDocument.update({likeCount: postData.likeCount});
                    })
                    .then(() => {
                        res.json(postData);
                    })
            }
        })
        .catch(error => {
            res.status(500).json({error: err.code});
        })
}

exports.deletePost = (req, res) => {
    const document = db.doc(`/posts/${req.params.postID}`);
    document.get()
    .then(doc => {
        if (!doc.exists) {
            return res.status(404).json({error: "Post not found"});
        }
        if (doc.data().userHandle !== req.user.handle) {
            return res.status(403).json({error: "UnAuthorized"});
        } else {
            return document.delete();
        }
    })
    .then(() => {
        res.json({ message: "Post deleted successfully" });
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({error: err.code});
    })
}

exports.deleteComment = (req, res) => {
    db.doc(`/posts/${req.params.postID}`).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({error: 'This Post Is Not Exist'});
            }
            return doc.ref.update({ commentCount: doc.data().commentCount - 1 });
        })
        .catch(err => {
            res.status(500).json({error: 'Something went wrong'});
        });


    const document = db.doc(`/comments/${req.params.commentID}`);
    document.get()
    .then(doc => {
        if (!doc.exists) {
            return res.status(404).json({error: "Comment not found"});
        }
        return document.delete();
    })
    .then(() => {
        res.json({ message: "Comment deleted successfully" });
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({error: err.code});
    })
}