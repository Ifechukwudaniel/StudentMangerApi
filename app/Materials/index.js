var MaterialController = require('./controller');
const {app} = require('../../server')
const {
   CreateMaterial,
   FetchMaterialsByCourseId
} = require("../../constants/routes")


app.post(CreateMaterial, MaterialController.createMaterial)
app.get(FetchMaterialsByCourseId, MaterialController.getMaterialByCourseId )

