const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const Courses = new mongoose.Schema({
  dayActions:[{
    type: ObjectId,
    ref:"DayAction" 
  }],
   timeTable:{
    type: ObjectId,
    ref:"TimeTable" 
   },
   weekDay:{
     type:Number,
     required:true,
     enum:[1,2,3,4,5,6,7]
   }
});

module.exports = mongoose.model('Day',Courses );