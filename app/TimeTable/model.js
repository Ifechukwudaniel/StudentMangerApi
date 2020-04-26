const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const configModel = require('../utils/configModel')

const TimeTable = new mongoose.Schema({
  days:[{
    type: ObjectId,
    ref:"Day" 
  }],
   level:{
    type: ObjectId,
    ref:"Level" 
   },
},  configModel.options);

module.exports = mongoose.model('TimeTable',TimeTable );