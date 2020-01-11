module.exports = function (app, passport){
   // Home Route
   app.use('/',require('../app/Home'));

   // //Courses Route
   // app.use('/courses', require('../app/Courses'));

   // //Departments Route
   // app.use('/department', require('../app/Departments'));

   // //Levels Route
   // app.use('/level', require('../app/Levels'));

   // //materials Route
   // app.use('/materials', require('../app/Materials'));

   // // User Routes
   // app.use('/auth', require('../app/User')(passport));
    
}