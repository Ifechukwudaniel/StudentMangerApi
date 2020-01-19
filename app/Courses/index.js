var CoursesController = require('./controller');
const {app} = require('../../server')
const {
  CreateCourse,
  FetchCourseByLevel,
  FetchAllCourse
} = require("../../constants/routes")
const passport = require('passport')


app.post(CreateCourse, 
  passport.authenticate('jwt', {session:false}),
  CoursesController.createCourse
);

app.get(FetchCourseByLevel, 
  passport.authenticate('jwt', {session:false}),
  CoursesController.getAllCourseByLevel
)

app.get(FetchAllCourse,
  passport.authenticate('jwt', {session:false}),
   CoursesController.getAllCourses
)
