const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    },


  });

  module.exports = mongoose.model('notes', NotesSchema)
//   model bnaya export krte time model ko naam diya schema se ek model bnaya then nam diya and then schema ko pass kiya