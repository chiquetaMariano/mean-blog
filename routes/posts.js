const router = require('express').Router();

const Post = require('../models/Post');

router.get('/', async (req, res) => {
    const posts = await Post.find().sort({date: 'desc'});
    res.send({ posts });
});

router.post('/', async (req, res) => {
    const { title, description} = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'Please Write a Title'});
    }
    if(!description) {
        errors.push({text: 'Please Write a Description'});
    }
    if(errors.length > 0) {
        console.log(errors);
        // res.render('posts/new-post', {
        //     errors,
        //     title,
        //     description
        // });
    } else {
        const newPost = new Post({ title, description});
        await newPost.save();
    }
});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.send({post});
});

router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
});

router.put('/:id', async (req, res) => {
    const {title, description } = req.body;
    await Post.findByIdAndUpdate(req.params.id, {title, description});
    // res.redirect('/posts');
});

module.exports = router;
