const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const configModel = require('../utils/configModel')

const Day = new mongoose.Schema({
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
     enum:[0,1,2,3,4,5,6]
   },
   active:{
     type:Boolean,
     default:false
   }
},  configModel.options);

module.exports = mongoose.model('Day', Day );