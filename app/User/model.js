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
    enum: [admin, user, staff],
    default: user,
  },
  accessLevel:{
    type:Number,
    default:0
  },
  phoneNumber:{
    type:Number,
  },
  parentNumber:{
    type:Number,
  },
  guardianNumber:{
    type:Number
  },
  nextOfKin:{
    type:Number
  },
}, configModel.options);

module.exports = mongoose.model('User', User);