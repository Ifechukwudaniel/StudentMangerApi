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
   location:{
    type:String,
    required:true
   }
});

module.exports = mongoose.model('DayAction',DayAction );