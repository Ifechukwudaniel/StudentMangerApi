var TimeTableController = require('./controller');
const {app} = require('../../server')
const {
   CreateTimeTableByDepartment
} = require("../../constants/routes")
const passport = require('passport')
const {roleAuthorization} = require('../utils/roleAuthorization')

app.post( CreateTimeTableByDepartment, 
      passport.authenticate('jwt', {session:false}),
      TimeTableController.addTimeTableByDepartment
)