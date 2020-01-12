const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const {PastQuestions,studyMaterial} = require('../../constants/SchemaEnum')

const Materials = new mongoose.Schema({
  course:{
      type:ObjectId,
      ref:""
  },
  file:{
      type:String,
      required:true
  },
  name:{
    type:String,
    required:true
  },
  type:{
    type: String,
    enum: [studyMaterial, PastQuestions],
    default:"P"
  }
});

module.exports = mongoose.model('Materials', Materials);