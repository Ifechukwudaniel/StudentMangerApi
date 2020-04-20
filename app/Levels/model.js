const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const Level= new mongoose.Schema({
  number: {
    required: true,
    type: Number,
  },
   courses: [{
    type: ObjectId,
    ref:"Courses"
  }],
  department:{
    type:ObjectId,
    ref:"Department"
  },
  timeTable:{
    type:ObjectId,
    ref:"TimeTable",
    default:null
  }
});

module.exports = mongoose.model('Level', Level);