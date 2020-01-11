const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const Departments = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  courseCode:{
      type:String,
      required:true
  },
   description:{
       type:String,
       required:true
   },
   material:[{
       
   }]
});

module.exports = mongoose.model('Department', Departments);