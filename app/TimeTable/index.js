var TimeTableController = require('./controller');
const {app} = require('../../server')
const {
   CreateTimeTableByLevel,
   FetchTimeTableByLevel
} = require("../../constants/routes")
const passport = require('passport')
const {roleAuthorization} = require('../utils/roleAuthorization')

app.post( CreateTimeTableByLevel, 
      passport.authenticate('jwt', {session:false}),
      TimeTableController.addTimeTableByLevel
)


app.get(FetchTimeTableByLevel, 
      passport.authenticate('jwt', {session:false}),
      TimeTableController.getTimeTableByLevel
)