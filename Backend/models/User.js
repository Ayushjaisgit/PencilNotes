const mongoose = require('mongoose');
const { Schema } = mongoose;
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
    password:{
        type:String,
        required: true
    },
    Date:{
        type:Date,
        default:Date.now
    },


  });
const User = mongoose.model('user', UserSchema);
// User.createIndexes();
  module.exports = mongoose.model('user', UserSchema)
//   model bnaya export krte time model ko naam diya schema se ek model bnaya then nam diya and then schema ko pass kiya

