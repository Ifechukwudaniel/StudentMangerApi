const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const TimeTable = new mongoose.Schema({
  days:[{
    type: ObjectId,
    ref:"Day" 
  }],
   level:{
    type: ObjectId,
    ref:"Level" 
   },
});

module.exports = mongoose.model('TimeTable',TimeTable );