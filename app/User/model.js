const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const {user, admin} = require('../../constants/SchemaEnum')

const User = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  matricNumber: {
    required: true,
    type: String,
  },
   level: {
    type: ObjectId,
    ref:"levels"
  },
  department:{
      type:ObjectId,
      ref:"department"
  },
  password:{
      type:String,
      required:true
  },
  role: {
    type: String,
    enum: [admin, user],
    default: user,
  },
  accessLevel:{
    type:Number,
    default:0
  }
});

module.exports = mongoose.model('User', User);