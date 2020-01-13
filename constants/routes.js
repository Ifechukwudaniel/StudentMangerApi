module.exports = {
   CreateDepartment:"/department/create",
   CreateLevel:"/level/create",
   CreateCourse:"/course/create",
   CreateUser:"/auth/register",
   CreateMaterial:"/material/create",
   FetchUserAllUser:"/users",
   FetchUserById:"/auth/:userId",
   FetchAllDepartment:"/department/",
   FetchLevelByDepartmentId :"/:departmentId/level/",
   FetchCourseByLevel:"/:level/course/",
   FetchMaterialsByCourseId:"/material/:materialId",
   DeleteDepartment:"/department/",
   DeleteById:"/auth/:userId",
   Login :"/auth/login"
}