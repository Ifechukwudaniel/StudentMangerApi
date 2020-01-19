const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const Courses = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  image:{
      type:String,
      required:true
  },
  content:{
      type:String,
      required:true
  }
});

module.exports = mongoose.model('Courses',Courses );