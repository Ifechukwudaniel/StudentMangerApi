const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

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
  }
});

module.exports = mongoose.model('Blogs',Blogs );