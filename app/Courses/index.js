var CoursesController = require('./controller');
const {app} = require('../../server')
const {
  CreateCourse,
  FetchCourseByLevel,
  FetchAllCourse,
  searchMaterials,
  SearchCourse,
  FetchCoursesWebView
} = require("../../constants/routes")
const passport = require('passport')
const {roleAuthorization} = require('../utils/roleAuthorization')


app.post(CreateCourse, 
  passport.authenticate('jwt', {session:false}),
  roleAuthorization(['admin']),
  CoursesController.createCourse
);

app.get(FetchCourseByLevel, 
  passport.authenticate('jwt', {session:false}),
  roleAuthorization(['admin', 'student']),
  CoursesController.getAllCourseByLevel
)

app.get(FetchAllCourse,
  passport.authenticate('jwt', {session:false}),
  roleAuthorization(['admin','student']),
   CoursesController.getAllCourses
)

app.get(FetchCoursesWebView,
  passport.authenticate('jwt', {session:false}),
  roleAuthorization(['admin','student']),
  CoursesController.getAllCoursesWebView
)

app.get(SearchCourse,
  passport.authenticate('jwt', {session:false}),
  roleAuthorization(['admin','student']),
   CoursesController.searchCourse
)
