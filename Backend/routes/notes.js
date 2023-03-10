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
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.messege);
        res.status(500).send("Internal server occured In Get User")
    }

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
            res.status(500).send("Internal server occured on adding a new Note")
        }

    });

        // Route 3  Update an existing notes using PUT:"/api/notes/updatenote" . login required

        router.put('/updatenote/:id', fetchuser, async (req, res) => {
            try {
                
            const { title, description, tag, } = req.body

            // Create a newNote object
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            // Find the note to be updated and update it 
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found")}

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }

            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({note});
        }
        catch (error) {
            console.log(error.messege);
            res.status(500).send("Internal server occured On Updating the note")
        }
            
        })


        // Route 4  delete an existing notes using delete:"/api/notes/deletenote" . login required

        router.delete('/deletenote/:id', fetchuser, async (req, res) => {
            try {
                
          
            const { title, description, tag, } = req.body

            // Find the note to be deleted and delete it 
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found")}

            // allow deletion only if user own this note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }

            note = await Note.findByIdAndDelete(req.params.id)
            res.json({"Success": "the note has been deleted", note:note});

        } catch (error) {
            console.log(error.messege);
            res.status(500).send("Internal server occured On deleting a user's note")
        }


        })


 
module.exports = router;