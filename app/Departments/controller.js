const Department = require('./model');
const Level = require('../Levels/model')
const createDepartment =(req, res, next)=>{
  const {
   name
  } = req.body

  if(!name)
  return  res.status(500).send(missingParameterError("department"))
  
    Department.find({name:name})
    .then((value)=>{
      if(value.length !==0){
         console.log(value)
        return res.status(500).json({error:"This department already exist"})
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
  //  .select("-levels")
    .populate({path:'levels', select:'number'})
    // .sort('descending')
   .then(departments=>res.json(departments))
   .catch(err=>next(err))
}


const getDepartmentById= (department)=>{
  return new Promise(( resolve , reject)=>{
  Department.findOne({_id:department})
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
    getDepartmentById
  };