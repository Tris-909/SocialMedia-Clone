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