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
  material:{
    type: ObjectId,
    ref:'Material'
  }
});

module.exports = mongoose.model('Comments',Comment );