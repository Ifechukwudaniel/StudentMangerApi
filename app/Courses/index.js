var CoursesController = require('./controller');
const {app} = require('../../server')
const {
  CreateCourse,
  FetchCourseByLevel
} = require("../../constants/routes")


app.post(CreateCourse, CoursesController.createCourse);
app.get(FetchCourseByLevel, CoursesController.getAllCourseByLevel)
