const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const {PastQuestions,studyMaterial} = require('../../constants/SchemaEnum')

const Materials = new mongoose.Schema({
  course:{
      type:ObjectId,
      ref:"Courses",
      required:true
  },
  file:{
      type:String,
      required:true
  },
  fileType:{
    type:String,
    required:true
  },
  lecturer:{
    type:String,
    required:true
  }, 
  pages:{
    type:Number,
    required:true
  },
  printedCopies:{
    type:Number,
    required:true,
    default:0 
  },
  descriptionTitle:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Materials', Materials);