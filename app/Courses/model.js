const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
var mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const Courses = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  courseCode:{
      type:String,
      required:true,
  },
   description:{
       type:String,
       required:true
   },
   level:{
    type: ObjectId,
    ref:"Level" 
   },
   department:{
    type: ObjectId,
    ref:"Department" 
   },
   material:[{
    type: ObjectId,
    ref:"Materials"  
   }]
});

Courses.plugin(mongoose_fuzzy_searching, {fields: ['courseCode', 'title']});

module.exports = mongoose.model('Courses',Courses );