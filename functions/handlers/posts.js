const {db} = require('../utilities/admin');

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
                likeCount: doc.data().likeCount
            });
        });
        return res.json(posts);
    })
    .catch( (err) => {
        console.log(err);
        res.status(500).json({ error: err.code });
    });
}

exports.postOnePost = (req, res ) => {    
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
                postData.comments.push(doc.data());
            });
            return res.json(postData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
}

exports.commentOnPost = (req, res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({error: 'Command must not be empty'});
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
            return db.collection('comments').add(newComment);
        })
        .then(() => {
            res.json(newComment);
        })
        .catch(err => {
            res.status(500).json({error: 'Something went wrong'});
        });
}