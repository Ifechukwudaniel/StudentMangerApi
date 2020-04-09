const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const Courses = new mongoose.Schema({
  date:{
      type:Date,
      required:true,
      default:Date.now()
  },
   course:{
    type: ObjectId,
    ref:"Course" 
   },
   user:{
    type: ObjectId,
    ref:"User" 
   },
   attended:{
     type:Boolean,
     required:true,
     default:false
   }
});

module.exports = mongoose.model('Courses',Courses );