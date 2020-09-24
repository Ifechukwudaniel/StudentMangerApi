const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const configModel = require('../utils/configModel')

const Blogs= new mongoose.Schema({
  image: {
    required: true,
    type: String,
  },
  title:{
    type:String,
    required:true
  },
  content:{
      type:String,
      required:true
  },
  comments:[{
    type:ObjectId,
    ref:"Comments"
  }],
  timeStamp:{
     type:Date,
     default:Date.now()
  },
  tag:{
    type:String,
  },
  likedBy:[{
    type:ObjectId,
    ref:"Users"
  }],
  disLikedBy:[{
    type:ObjectId,
    ref:"Users"
  }]
},  configModel.options);

module.exports = mongoose.model('Blogs',Blogs );