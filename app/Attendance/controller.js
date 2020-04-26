const Course= require("../Courses/model")
const User = require('../User/model')
const Attendance = require('./model')
const {missingParameterError}  = require("../utils/error")
const _ = require('lodash')
 
const addAttendance= (req, res )=>{
   const {course, present, matricNumber} = req.body
   if(!matricNumber)return res.status(500).send(missingParameterError("Matric Number"))
   if(!course)return res.status(500).send(missingParameterError("Course "))

   User.findOne({matricNumber})
   .then(user=>{
      if(!user)  return res.status(500).send({error:`user with matric number ${matricNumber} not found`})
       Course.findById(course)
       .then(course=>{
        if(!course)  return res.status(500).send({error:`course with id ${course} not found`})
         Attendance.create({user:user._id, course:course._id, attended:present})
         .then((attended)=>{
           return res.status(200).send({success:`Saved student attendance `})
         })
       })
       .catch(err=>{
        return res.status(500).send({error:`Please an error ocurred`})
       })
   })
   .catch(err=>{
     console.log(err)
   })
}

const getAttendance= (req, res )=>{
  const {_id} = req.user
  Attendance.find({user:_id})
  .populate({path:'course',select:'courseCode title  -_id'})
  .then(attendance=>{
    return res.send(_.groupBy(attendance,(data)=>data.course.courseCode))
  })
  .catch(err=>{
      console.log(err)
    return res.status(500).send({error:`Please an error ocurred`})
  })
 }

module.exports = {
   addAttendance,
   getAttendance
};