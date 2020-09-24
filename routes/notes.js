const router = require('express').Router();

const Note = require('../models/Note');

router.get('/', async (req, res) => {
    const notes = await Note.find().sort({date: 'desc'});
    res.send({ notes });
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
        // res.render('notes/new-note', {
        //     errors,
        //     title,
        //     description
        // });
    } else {
        const newNote = new Note({ title, description});
        await newNote.save();
    }
});

router.get('/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.send({note});
});

router.delete('/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
});

router.put('/:id', async (req, res) => {
    const {title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    res.redirect('/notes'); // remove this line?
});

module.exports = router;
