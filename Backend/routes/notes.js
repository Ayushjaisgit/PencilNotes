const express = require('express')
const router = express.Router();
// imported user in the app 
const Note = require('../models/Note')
// express validator for the valid data sending 
const { body, validationResult } = require('express-validator');
//middleware fetchuser import
const fetchuser = require('../middleware/FetchUser')

// Route 1  getting all the notes using GET:"/api/auth/getuser" . login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes)
})





// Route 2  Add a new notes using POST:"/api/auth/addnote" . login required

router.post('/addnote', fetchuser, [

    body('title', ' Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {

    try {

        const { title, description, tag, } = req.body
        // if there are errors return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // add a new note 
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    }

    catch (error) {
        console.log(error.messege);
        res.status(500).send("some error occured")
    }

    //   const notes = await Notes.find({user: req.user.id});
})
module.exports = router;