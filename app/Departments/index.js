var DepartmentController = require('./controller');
const {app} = require('../../server')
const {
    CreateDepartment,
    FetchAllDepartment,
    DeleteDepartment
} = require("../../constants/routes")

app.post(CreateDepartment, DepartmentController.createDepartment);

app.get(FetchAllDepartment, DepartmentController.getAllDepartment);

app.delete(DeleteDepartment, DepartmentController.deleteDepartment)