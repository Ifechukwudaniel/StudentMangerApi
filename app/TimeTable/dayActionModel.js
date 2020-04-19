const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const DayAction = new mongoose.Schema({
  startTime:{
      type:Number,
      required:true,
  },
  endTime:{
    type:Number,
     required:true
},
   course:{
    type: ObjectId,
    ref:"Course" 
   },
   day:{
    type: ObjectId,
    ref:"Course" 
   }
  
});

module.exports = mongoose.model('DayAction',DayAction );