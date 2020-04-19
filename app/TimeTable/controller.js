const TimeTable= require("./model")
const Department = require('../Departments/model')
const Level = require('../Levels/model')
const {missingParameterError}  = require("../utils/error")
// const moment = require('moment')
 
const addTimeTableByDepartment= (req, res )=>{
  const {department} =  req.params
  if(!department){
     

  }
}

module.exports = {
    addTimeTableByDepartment
};