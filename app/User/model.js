const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const {user, admin, staff} = require('../../constants/SchemaEnum')
const configModel = require('../utils/configModel')

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
    ref:"Level"
  },
  department:{
      type:ObjectId,
      ref:"Department"
  },
  password:{
      type:String,
      required:true
  },
  role: {
    type: String,
    enum: [admin, user, staff],
    default: user,
  },
  accessLevel:{
    type:Number,
    default:0
  },
}, configModel.options);

module.exports = mongoose.model('User', User);