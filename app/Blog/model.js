const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const Blogs= new mongoose.Schema({
  image: {
    required: true,
    type: String,
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
  }
});

module.exports = mongoose.model('Blogs',Blogs );