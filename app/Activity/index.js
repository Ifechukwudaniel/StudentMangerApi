var AttendanceController = require('./controller');
const {app} = require('../../server')
const {
  CreateAttendance,
  FetchAttendance,
  FetchAttendanceByCourse
} = require("../../constants/routes")
const passport = require('passport')
const {roleAuthorization} = require('../utils/roleAuthorization')

