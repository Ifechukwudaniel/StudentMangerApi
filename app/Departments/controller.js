const Department = require('./model');
const Level = require('../Levels/model')
const createDepartment =(req, res, next)=>{
  const {
   name
  } = req.body
    Department.find({name:name})
    .then((value)=>{
      if(value.length !==0){
         console.log(value)
        return res.json({error:"This department already exist"})
      }
      else{
        const department =  new Department({
          name
       })
       department
        .save()
        .then(department=>res.json(department))
        .catch(err=> next(err))
      }
      
    })
}

const getAllDepartment = (req, res, next)=>{
   Department.find({})
   .then(departments=>res.json(departments))
   .catch(err=>next(err))
}


const getDepartmentByName = (department)=>{
  return new Promise(( resolve , reject)=>{
  Department.findOne({name:department})
  .then((value)=>{
     if (value==null) {
      reject(value)
     }
     resolve(value)
  })

})}
const deleteDepartment = (req, res, next)=>{
  const {
    name
  } =req.body
  Department.findOne({name:name})
  .then((value)=>{
    if(value!==null){
      value.levels.map((level)=>{
          Level.remove({_id:level,department:value._id})
      })
      Department.deleteOne({_id:value.id})
      .then(()=>{
        return res.send({message:"deleted Sucessfully"})
      })
    }
    else{
       return res.status(500).send({error:`${name}  does not exist`})
    }
  })
}

  module.exports = {
    createDepartment,
    getAllDepartment,
    deleteDepartment,
    getDepartmentByName
  };