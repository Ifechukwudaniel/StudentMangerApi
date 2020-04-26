const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const configModel = require('../utils/configModel')

const Event = new mongoose.Schema({
  date:{
      type:Date,
      required:true,
  },
   time:{
    type: String,
    required:true
   },
   image:{
    type: String,
    required:true
   },
   title:{
    type: String,
    required:true
   },
   description:{
    type: String,
    required:true
   }
}, configModel.options);

module.exports = mongoose.model('Courses',Courses );