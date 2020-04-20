const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const DayAction = new mongoose.Schema({
  startTime:{
      type:String,
      required:true,
  },
  endTime:{
    type:String,
     required:true
},
   course:{
    type: ObjectId,
    ref:"Course" 
   },
});

module.exports = mongoose.model('DayAction',DayAction );