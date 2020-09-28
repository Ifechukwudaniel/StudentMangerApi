const Department = require('./model');
const Level = require('../Levels/model')
const {missingParameterError} = require('../utils/error');
const {createLevelFromNumber} = require('../utils/levelCreate');

const createDepartment =(req, res, next)=>{
  const {
   name
  } = req.body

  if(!name)
  return  res.status(500).send(missingParameterError("department name"))
  
    Department.find({name:name})
    .then((value)=>{
      if(value.length !==0){
        return res.status(500).json({message:"This department already exist"})
      }
      else{
        const department =  new Department({
          name
       })
       department
        .save()
        .then(department=>res.json(department))
        .catch(err=>  {
          return  res.status(500).json({message:"Please an error occurred"})
        })
      }
      
    })
}

const getAllDepartment = (req, res, next)=>{
   Department.find({})
    .populate({path:'levels', select:'number'})
   .then(departments=>res.json(departments))
   .catch(err=>{
      return  res.status(500).json({message:"Please an error occurred"})
   })
}

const getAllDepartmentWebView = (req, res, next)=>{
   Department.find({})
   .populate({path:'levels', select:'number'})
   .lean().exec()
   .then(departments=>{
     return res.json(departments.map((data)=>{
       return { id:data._id, name:data.name,totalLevels:data.levels.length}
     }))

   })
   .catch(err=>{
      return  res.status(500).json({message:"Please an error occurred"})
   })
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
        return res.send({message:"Deleted Successfully"})
      })
    }
    else{
       return res.status(500).send({error:`${name}  does not exist`})
    }
  })
}


const createDepartmentAndLevels= (req, res , next)=>{
  const { name, numberOfLevels} = req.body


if(!name)
return  res.status(500).send(missingParameterError("department name"))

if(!parseInt(numberOfLevels))
return  res.status(500).send(missingParameterError("number of levels"))

if(parseInt(numberOfLevels)> 8) return res.send(500).send({message:'The Number of level is to much'})

  Department.find({name:name})
  .then((value)=>{
    if(value.length !==0){
      return res.status(500).json({error:"This department already exist"})
    }
    else{
         const department =  new Department({
            name
         })
       const levels = createLevelFromNumber(parseInt(numberOfLevels), department._id) 
       Level.insertMany(levels)
       .then(data=>{
         data.map(level=>{
            department.levels.push(level._id)
         })
         department.save()
         .then((department)=>{
             return res.status(200).send({message:`Created department ${department.name} successfully`})
         })
       })
       .catch(err=>{
        return  res.status(500).json({message:"PLease an error occurred"})
       })
    }
    
  })
  .catch(err=>{
      return  res.status(500).json({message:"PLease an error occurred"})
   })
   
}

  module.exports = {
    createDepartment,
    getAllDepartment,
    deleteDepartment,
    getDepartmentById,
    getAllDepartmentWebView,
    createDepartmentAndLevels
  };