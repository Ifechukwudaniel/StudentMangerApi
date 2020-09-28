var DepartmentController = require('./controller');
const {app} = require('../../server')
const {
    CreateDepartment,
    FetchAllDepartment,
    DeleteDepartment,
    CreateDepartmentAndLevels,
    FetchDepartmentWebView
} = require("../../constants/routes")
const passport = require("passport")
const {roleAuthorization} = require('../utils/roleAuthorization')

app.post(CreateDepartment,
    passport.authenticate('jwt', {session:false}),
    roleAuthorization(['admin']),
    DepartmentController.createDepartment
);

app.post(CreateDepartmentAndLevels,
    passport.authenticate('jwt', {session:false}),
    roleAuthorization(['admin']),
    DepartmentController.createDepartmentAndLevels
);


app.get(FetchAllDepartment, 
    passport.authenticate('jwt', {session:false}),
    DepartmentController.getAllDepartment
);

app.get(FetchDepartmentWebView, 
    passport.authenticate('jwt', {session:false}),
    DepartmentController.getAllDepartmentWebView
);

app.delete(DeleteDepartment,
    passport.authenticate('jwt', {session:false}),
    roleAuthorization(['admin']),
     DepartmentController.deleteDepartment
)