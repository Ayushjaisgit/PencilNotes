// imported user in the app 
const Note = require('../models/Note')
// express validator for the valid data sending 
const { validationResult } = require('express-validator');



const updateNote = async (req, res) => {
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
    
}

const addNote = async (req, res) => {

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

    }




const GetNote = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
        console.log(notes)
    } catch (error) {
        console.log(error.messege);
        res.status(500).send("Internal server occured In Get User")
    }

}

const deleteNote = async (req, res) => {

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


}


exports.updateNote = updateNote
exports.addNote = addNote
exports.GetNote = GetNote
exports.deleteNote = deleteNote