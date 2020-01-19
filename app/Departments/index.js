var DepartmentController = require('./controller');
const {app} = require('../../server')
const {
    CreateDepartment,
    FetchAllDepartment,
    DeleteDepartment
} = require("../../constants/routes")
const passport = require("passport")

app.post(CreateDepartment,
    passport.authenticate('jwt', {session:false}),
    DepartmentController.createDepartment
);

app.get(FetchAllDepartment, 
    passport.authenticate('jwt', {session:false}),
    DepartmentController.getAllDepartment
);

app.delete(DeleteDepartment,
    passport.authenticate('jwt', {session:false}),
     DepartmentController.deleteDepartment
)