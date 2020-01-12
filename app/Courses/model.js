const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const Courses = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  courseCode:{
      type:String,
      required:true
  },
   description:{
       type:String,
       required:true
   },
   material:[{
    type: ObjectId,
    ref:"Materials"  
   }]
});

module.exports = mongoose.model('Courses',Courses );