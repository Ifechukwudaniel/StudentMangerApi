const Course= require("../Courses/model")
const User = require('../User/model')
const Attendance = require('./model')
const {missingParameterError}  = require("../utils/error")
const _ = require('lodash')
 
const addAttendance= (req, res )=>{
   const {course, present, matricNumber, timeStart, timeEnd} = req.body
   if(!matricNumber)return res.status(500).send(missingParameterError("Matric Number"))
   if(!course)return res.status(500).send(missingParameterError("Course "))
   if(!timeStart)return res.status(500).send(missingParameterError("Course "))
   if(!timeEnd)return res.status(500).send(missingParameterError("Course "))
    
   User.findOne({matricNumber:matricNumber.toUpperCase().trim()})
   .then(user=>{
      if(!user)  return res.status(500).send({error:`user with matric number ${matricNumber} not found`})
       Course.findById(course)
       .then(course=>{
        if(!course)  return res.status(500).send({error:`course with id ${course} not found`})
         Attendance.create({user:user._id, course:course._id, attended:present, timeEnd:timeEnd, timeStart:timeStart })
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
  .populate({path:'course',select:'courseCode title '})
  .then(attendance=>{
    let newAttendance=_.map(attendance, (a)=>{
         let newAttendance = ({...a.toJSON(),...a.toJSON().course})
       delete newAttendance['course']
        return newAttendance
    })
     let  listOfId  = _.uniqWith(_.map(newAttendance , (a)=>a._id), _.isEqual)
    let allUserAttendance =   _.map(listOfId, (id,i)=>{
       let { courseCode} =  _.findLast(newAttendance , {_id:id})
       let present = _.filter(newAttendance, {_id: id,  attended:true}).length
       let absent = _.filter(newAttendance, {_id: id,  attended:false}).length
       return {id ,  courseCode, present, absent, attendance: _.filter(newAttendance, {_id: id})}
     })
     return res.send(allUserAttendance)
  })
  .catch(err=>{
    console.log(err)
    return res.status(500).send({error:`Please an error ocurred`})
  })
 }

 const getUserAttendanceByCourse =(req, res)=>{
  const {_id} = req.user
  const course =  req.params.course
   Attendance.find({user:_id, course:course})
   .then((data)=>{
      return res.send(data)
   })
   .catch(err=>{
    console.log(err)
    return res.status(500).send({error:`Please an error ocurred`})
   })
 }

module.exports = {
   addAttendance,
   getAttendance,
   getUserAttendanceByCourse
};