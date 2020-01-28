const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const Comment= new mongoose.Schema({
  user: {
    required: true,
    type: ObjectId,
    ref:'User'
  },
  content:{
      type:String,
      required:true
  },
  time:{
    type:Date,
    default:Date.now()
  },
  blog:{
    type:ObjectId,
    ref:"Blogs"
  }
});

module.exports = mongoose.model('Comments',Comment );