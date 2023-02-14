const mongoose = require('mongoose');

const UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    Password:{
        type:String,
        required: true
    },
    Date:{
        type:Date,
        default:Date.now
    },


  });

  module.exports = mongoose.model('user', UserSchema)
//   model bnaya export krte time model ko naam diya schema se ek model bnaya then nam diya and then schema ko pass kiya