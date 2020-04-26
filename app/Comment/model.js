const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const configModel = require('../utils/configModel')

const Comment= new mongoose.Schema({
  user: {
    required: true,
    type: ObjectId,
    ref:'User'
  },
  content:{
      type:String,
      required:true
  },
  time:{
    type:Date,
    default:Date.now()
  },
  material:{
    type: ObjectId,
    ref:'Material'
  }
}, configModel.options);

module.exports = mongoose.model('Comments',Comment );