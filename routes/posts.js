const router = require('express').Router();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mymetype === 'image/jpeg' || file.mymetype === 'image/png'){
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const upload = multer({
  storage: storage
  // ,
  // fileFilter: fileFilter
});

// const upload = multer({dest: './public/uploads'});

const Post = require('../models/Post');

router.get('/', async (req, res) => {
    const posts = await Post.find().sort({date: 'desc'});
    res.send({ posts });
});

router.post('/', upload.single('postImage'), async (req, res) => {
    // console.log(req.file);
    const { title, description} = req.body;
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      image: req.file.path
    });

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
        const newPost = post;
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
