const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
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
    isComplete:{
        type:Boolean,
        default:false
    }


  });

  module.exports = mongoose.model('notes', NotesSchema)
//   model bnaya export krte time model ko naam diya schema se ek model bnaya then nam diya and then schema ko pass kiya