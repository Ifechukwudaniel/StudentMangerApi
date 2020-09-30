const  Level = require('./model');
const  Department = require('../Departments/model')
const DepartmentController = require("../Departments/controller")
const {missingParameterError } = require('../utils/error')

const createLevel =(req, res, next)=>{
  const {
   number,
   department,
  } = req.body
  if(!department)
    return  res.status(500).send(missingParameterError("department"))

  if(!number)
    return  res.status(500).send(missingParameterError("number"))

   DepartmentController.getDepartmentById(department)
   .then((department)=>{
     Level.find({number:number, department:department._id})
     .then((value)=>{
       if(value.length===0){
        const level = new Level({
          number,
          department:department._id
        })
        level
        .save()
        .then(({_id})=>{
           Department
           .findByIdAndUpdate(department._id,{
              $push:{levels:{_id}}
           },{new:true})
           .exec()
           .then(data=>{
              return res.send({message: `You just added to ${number} level to ${department.name} department`})
           })
        })
       }
       else 
        return res.status(500).send({error:`${number} level already exist in this department`})
     })

   })
   .catch(value=>{
    return  res.status(500).send({error: `department   does not exist`})
   })


}

const getAllLevel = (req, res, next)=>{
   Level.find({})
   .populate({path:'department', select:'name'})
   .lean().exec()
   .then(data=>{
    return res.send(data.map((x=>{
      console.log(x.timetable)
      return {id:x._id,department: x.department.name,departmentId: x.department._id,level: x.number, hasTimeTable:x.timeTable==null?false:true , totalCourses:x.courses.length }
    })))
   })
   .catch(err=> res.status(500).send({error:`Please an error occurred`}) )
}

const getLevelByDepartmentId = (req, res, next)=>{
   const{
    departmentId
   } = req.params

  Department.findById(departmentId)
    .populate({path:"levels", select:'number'})
    .then(data=>{
     return res.send(data.levels)
    })
    .catch(err=> res.status(500).send({error:`${departmentId} is not a department id`}) )
}


  module.exports = {
   createLevel,
   getAllLevel,
   getLevelByDepartmentId
  };