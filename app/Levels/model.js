const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types

const Levels = new mongoose.Schema({
  number: {
    required: true,
    type: String,
  },
   courses: [{
    type: ObjectId,
    ref:"Courses"
  }],
});

module.exports = mongoose.model('Levels', Levels);