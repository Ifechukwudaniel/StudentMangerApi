// const Course= require("./model")
// const Department = require('../Departments/model')
// const Level = require('../Levels/model')
const {missingParameterError}  = require("../utils/error")
 
const addAttendance= (req, res )=>{
 console.log(req.body, req.user)
}

module.exports = {
   addAttendance
};