const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
//middleware fetchuser import
const fetchuser = require('../middleware/FetchUser')
//Controller import
const notesController  = require('../controllers/notes')



// Route 1  getting all the notes using GET:"/api/auth/getuser" . login required

router.get('/fetchallnotes', fetchuser, notesController.GetNote)


// Route 2  Add a new notes using POST:"/api/auth/addnote" . login required

router.post('/addnote', fetchuser, [

    body('title', ' Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], notesController.addNote );

// Route 3  Update an existing notes using PUT:"/api/notes/updatenote" . login required

router.put('/updatenote/:id', fetchuser, notesController.updateNote )


// Route 4  delete an existing notes using delete:"/api/notes/deletenote" . login required

router.delete('/deletenote/:id', fetchuser, notesController.deleteNote)


 
module.exports = router;