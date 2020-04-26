const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const {PastQuestions,studyMaterial} = require('../../constants/SchemaEnum')
var mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const configModel = require('../utils/configModel')

const Materials = new mongoose.Schema({
  course:{
      type:ObjectId,
      ref:"Courses",
      required:true,
  },
  file:{
      type:String,
      required:true,
  },
  fileType:{
    type:String,
    required:true
  },
  fileGroup:{
    type:String,
    enum:[studyMaterial,PastQuestions],
    default:studyMaterial
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
  },
  date:{
    type:Date,
    default:Date.now()
  }
},  configModel.options);


Materials.plugin(mongoose_fuzzy_searching, {fields: ['lecturer']});

module.exports = mongoose.model('Materials', Materials);