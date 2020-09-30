var ActivityController = require('./controller');
const {app} = require('../../server')
const {
  WeaklyActivity,
  DayActivity,
  FetchTimeTableByLevelWeb
} = require("../../constants/routes")
const passport = require('passport')
const {roleAuthorization} = require('../utils/roleAuthorization')


 app.get(WeaklyActivity,
  passport.authenticate('jwt',{session:false}),
  ActivityController.getThisWeekActivityByLevel
);

app.get(WeaklyActivity,
  passport.authenticate('jwt',{session:false}),
  ActivityController.getThisWeekActivityByLevel
);

app.get(DayActivity,
  passport.authenticate('jwt',{session:false}),
  ActivityController.getTodayActivityByLevel
);

app.get(FetchTimeTableByLevelWeb,
  passport.authenticate('jwt',{session:false}),
  ActivityController.getTimeTableWeb
);