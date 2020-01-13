module.exports = {
   CreateDepartment:"/department/create",
   CreateLevel:"/level/create",
   CreateCourse:"/course/create",
   CreateUser:"/auth/register",
   FetchUserAllUser:"/users",
   FetchUserById:"/auth/:userId",
   FetchAllDepartment:"/department/",
   FetchLevelByDepartmentId :"/:departmentId/level/",
   FetchCourse:"/:level/course/",
   DeleteDepartment:"/department/",
   DeleteById:"/auth/:userId",
   Login :"/auth/login"
}