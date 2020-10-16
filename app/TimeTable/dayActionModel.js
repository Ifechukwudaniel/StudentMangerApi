const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const configModel = require('../utils/configModel')

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
    ref:"Courses" 
   },
   location:{
    type:String,
    required:true
   },
  date:{
    type:Date
  },
  repeated:{
     type:Boolean,
     default:false
  },
  level:{
    type: ObjectId,
    ref:"Level" 
  },
  weekDay:{
    type:Number,
    enum:[1,2,3,4,5,6,7],
    required:true
  },
  type:{
    type:Number,
    enum:[0,1,2,3],
    default:0
  }

},  configModel.options);

module.exports = mongoose.model('DayAction',DayAction );