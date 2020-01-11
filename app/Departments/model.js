const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const Departments = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
   levels: [{
    type: ObjectId,
    ref:"Level"
  }],
});

module.exports = mongoose.model('Department', Departments);