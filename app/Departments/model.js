const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const configModel = require('../utils/configModel')

const Departments = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
   levels: [{
    type: ObjectId,
    ref:"Level"
  }],
},  configModel.options);

module.exports = mongoose.model('Department', Departments);