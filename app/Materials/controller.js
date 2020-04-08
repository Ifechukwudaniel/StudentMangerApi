const  Material = require('./model');
const Course = require("../Courses/model")
const {missingParameterError } = require('../utils/error')

const createMaterial =(req, res, next)=>{
  const {  name,file,fileType,course, type} = req.body

  if(!name){
    return  res.status(500).send(missingParameterError("name"))
  }

  if(!file){
    return  res.status(500).send(missingParameterError("file"))
  }

  if(!fileType){
    return  res.status(500).send(missingParameterError("file Type"))
  }

  if(!course){
    return  res.status(500).send(missingParameterError("Course"))
  }

  if(!type){
    return  res.status(500).send(missingParameterError("Type"))
  }

  var courseId = course
  Course.findById(courseId)
  .then((course)=>{
      const material = new Material({
      name,
      file,
      fileType,
      course,
      type
      })
      material
      .save()
      .then(value=>{
         Course.findByIdAndUpdate(course,{$push:{material:value._id}}, {new:true})
         .exec()
         .then(()=>{
          return res.send({message: `You just added to ${name} level to ${course.courseCode} department`})
         })
      })
      .catch((err)=>{
        return  res.status(500).send({error:` Please an error occurred`})
      })
  })
  .catch((value)=>{
    return  res.status(500).send({error:` Course with id ${course}  does not exist`})
  })
    
}

const getMaterialByCourseId = (req, res, next)=>{
   const{
    levelId
   } = req.params

  Course.findById(departmentId)
    .populate("materials ")
    .then(data=>{
     return res.send(data.ma)
    })
    .catch(err=> res.status(500).send({error:`${departmentId} is not a department id`}) )
}

const getMaterials= (req, res, next) =>{
  Material.find()
  .then(data=>{
      return res.send(data)
  })
  .catch(err=> res.status(500).send({error:`Please an error occurred `}) )
}


  module.exports = {
   createMaterial,
   getMaterialByCourseId,
   getMaterials
  };