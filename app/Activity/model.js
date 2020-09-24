const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const configModel = require('../utils/configModel')

const PassiveActivity = new mongoose.Schema({
  date:{
      type:Date,
      default:Date.now()
  },
   timeStart:{
     type:String,
     required:true
   },
   timeEnd:{
     type:String,
     required:true
   }
}, configModel.options);

module.exports = mongoose.model('PassiveActivity',PassiveActivity );