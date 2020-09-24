const Course= require("./model")
const Department = require('../Departments/model')
const Level = require('../Levels/model')
const {missingParameterError}  = require("../utils/error")

const  createCourse= (req,res, next)=>{
   const {
     department, 
     level,
     title,
     description,
     courseCode
   } = req.body

  if(!department) return res.status(500).send(missingParameterError("department"))

  if(!level)  return res.status(500).send(missingParameterError("level"))

  if(!title) return res.status(500).send(missingParameterError("title"))

  if(!description) return res.status(500).send(missingParameterError("description"))

   Department.findOne({_id:department})
   .then((dep)=>{
        Level.findOne({_id: level})
        .then((lev)=>{
            if(String(dep._id) !== String(lev.department)){
               console.log(dep._id,lev.department)
               return res.status(500).send({error:` The course does not belong to that department`})
            }
            else{
              const courses = new Course({
                title,
                courseCode,
                description,
                department,
                level
              })
              .save()
              .then((data)=>{
               Level
                .findByIdAndUpdate(lev._id, 
                  { $push:{courses:data._id}
                  }).exec()
                  .then(()=>{
                     return res.send({message:`You just added ${courseCode}  to your ${lev.number} level ${dep.name}`})
                  })
              })

            }
        })
        .catch((err)=>{
          console.log(err)
          return res.status(500).send({error:` could not find Level with id  ${level}`})
        })
   })
   .catch((err)=>{
        console.log(err)
       return res.status(500).send({error:` could not find Department with id ${department}`})
   })
}

getAllCourseByLevel= (req, res, next)=>{
  const {
     level,
  } = req.params
       Level.findOne({
         _id:level
       })
       .populate(" courses  ")
       .then((lev)=>{
                   return res.send(lev.courses)
       })
  
}
getAllCourses = (req, res, next )=>{
    Course.find({})
    .populate('level', 'number -_id')
    .populate('department', "name -_id")
    .then(data=>{
      return res.send(data)
    })
}

const searchCourse=(req, res)=>{
  const {searchQuery} = req.params
  if(!searchQuery){
     return   res.status(404).send({error:"Please add a Text"})
  }

  Course.fuzzySearch(searchQuery,(err, data)=>{
    if(err){
      return  res.status(500).send({error:"Please an error occurred"})  
    }
     return res.send(data) 
  })
}


module.exports = {
   createCourse,
   getAllCourseByLevel,
   getAllCourses,
   searchCourse
};