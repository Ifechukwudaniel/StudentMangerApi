var DepartmentController = require('./controller');
const {app} = require('../../server')
const {
    CreateDepartment,
    FetchAllDepartment,
    DeleteDepartment
} = require("../../constants/routes")
const passport = require("passport")
const {roleAuthorization} = require('../utils/roleAuthorization')

app.post(CreateDepartment,
    passport.authenticate('jwt', {session:false}),
    roleAuthorization(['admin']),
    DepartmentController.createDepartment
);

app.get(FetchAllDepartment, 
    passport.authenticate('jwt', {session:false}),
    DepartmentController.getAllDepartment
);

app.delete(DeleteDepartment,
    passport.authenticate('jwt', {session:false}),
    roleAuthorization(['admin']),
     DepartmentController.deleteDepartment
)