const  Material = require('./model');
const Course = require("../Courses/model")
const Department = require("../Departments/model")
const Level = require('../Levels/model') 

const {missingParameterError } = require('../utils/error')

const createMaterial =(req, res, next)=>{
  const {  name,file,fileType,course, type, descriptionTitle, printedCopies,pages,lecturer} = req.body
   console.log(req.body)
  if(!name){
    return  res.status(500).send(missingParameterError("Name"))
  }

  if(!file){
    return  res.status(500).send(missingParameterError("File"))
  }

  if(!fileType){
    return  res.status(500).send(missingParameterError("File Type"))
  }

  if(!course){
    return  res.status(500).send(missingParameterError("Course"))
  }

  if(!type){
    return  res.status(500).send(missingParameterError("Type"))
  }
  if(!pages){
    return  res.status(500).send(missingParameterError("Pages"))
  }
  if(!descriptionTitle){
    return  res.status(500).send(missingParameterError("Description Title"))
  }
  if(!lecturer){
    return  res.status(500).send(missingParameterError("Lecturer"))
  }

  var courseId = course
  Course.findById(courseId)
  .then((course)=>{
      const material = new Material({
      name,
      file,
      fileType,
      course,
      type,
      descriptionTitle,
      pages,
      lecturer
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
        return  res.status(500).send({error:` Please this partial course does not exist`})
      })
  })
  .catch((value)=>{
    return  res.status(500).send({error:` Course with id ${course}  does not exist`})
  })
    
}

const getMaterialByCourseId = (req, res, next)=>{
   const{
    courseId
   } = req.params

  Course.findById(courseId)
    .populate("material", "-course -__v")
    .then(data=>{
     return res.send(data.material)
    })
    .catch(err=> res.status(500).send({error:`${coursesId} is not a department id`}) )
}

const getMaterials= (req, res, next) =>{
  Material.find()
  .then(data=>{
      return res.send(data)
  })
  .catch(err=> res.status(500).send({error:`Please an error occurred `}) )
}

const getMaterialsByDepartmentAndLevel= (req, res, next) =>{
  const {
    department,
    level
  } = req.params
  const material = []
  Department.findById(department)
  .then(department=>{
     Level.findById(level)
     .populate({path:"courses", select:"material -_id"})
     .then((level)=>{
        for (const course in level.courses) {
             material.push(...level.courses[course].material)
        } 
        Material.find().where("_id").in(material)
        .populate({path:'course', select:"courseCode description -_id" })
        .then(materials=>{
          res.send(materials.reverse())
        })
     })
     .catch(err=>{
       console.log(err)
       return res.status(404).send({error:`Please an error occurred`})
     })

  })
  .catch(err=>{
    console.log(err)
     return res.status(404).send({error:`department  Not found`})
  })
}

  module.exports = {
   createMaterial,
   getMaterialByCourseId,
   getMaterials,
   getMaterialsByDepartmentAndLevel
  };