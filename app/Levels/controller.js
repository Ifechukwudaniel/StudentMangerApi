const  Level = require('./model');
const  Department = require('../Departments/model')
const DepartmentController = require("../Departments/controller")

const createLevel =(req, res, next)=>{
  const {
   number,
   department
  } = req.body
  if(!department){
    return  res.send({error: "You can not create a  level without a department"})
  }

  if(!number){
    return  res.send({error: "You can not create a  level without a  with it"})
  }

   DepartmentController.getDepartmentByName(department)
   .then((department)=>{
      console.log(department)
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
        return res.send({error:`${number} level already exist in this department`})
     })

   })
   .catch(value=>{
    return  res.send({error: `${department} does not exist`})
   })


}

const getAllLevel = (req, res, next)=>{
   Department.find({})
   .then(departments=>res.json(departments))
   .catch(err=>next(err))
}

const deleteLevel = (req, res, next)=>{
  const {
    name
  } =req.body
  Department.deleteMany({name:name})
  .then(()=>res.send({message:"deleted Sucessfully"}))
}

  module.exports = {
   createLevel
  };