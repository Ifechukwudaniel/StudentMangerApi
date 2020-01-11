var CoursesController = require('./controller');
const {app} = require('../../server')
const {
  CreateCourse,
  FetchCourse
} = require("../../constants/routes")


app.post(CreateCourse, CoursesController.createCourse)
app.get(FetchCourse, CoursesController.getAllCourseByLevel)
