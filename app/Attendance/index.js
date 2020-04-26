var AttendanceController = require('./controller');
const {app} = require('../../server')
const {
  CreateAttendance,
  FetchAttendance
  
} = require("../../constants/routes")
const passport = require('passport')
const {roleAuthorization} = require('../utils/roleAuthorization')


app.post(CreateAttendance, 
    passport.authenticate('jwt',{session:false}) ,
    AttendanceController.addAttendance
)


app.get(FetchAttendance, 
  passport.authenticate('jwt',{session:false}) ,
  AttendanceController.getAttendance
)