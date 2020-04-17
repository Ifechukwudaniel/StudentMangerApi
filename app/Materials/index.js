var MaterialController = require('./controller');
const {app} = require('../../server')
const {
   CreateMaterial,
   FetchMaterialsByCourseId,
   FetchMaterials,
   FetchMaterialsByDepartmentAndLevel,
   searchMaterials,
} = require("../../constants/routes")
const passport = require('passport')
const {roleAuthorization} = require('../utils/roleAuthorization')


app.post(CreateMaterial, 
   passport.authenticate('jwt', {session:false}),
   roleAuthorization(['admin']),
   MaterialController.createMaterial
)

app.get(FetchMaterialsByCourseId,
   passport.authenticate('jwt', {session:false}),
   MaterialController.getMaterialByCourseId 
)

app.get(FetchMaterials, 
   passport.authenticate('jwt', {session:false}),
   MaterialController.getMaterials
)

app.get(FetchMaterialsByDepartmentAndLevel, 
   passport.authenticate('jwt', {session:false}),
   MaterialController.getMaterialsByDepartmentAndLevel
)

app.get(searchMaterials, 
   passport.authenticate('jwt', {session:false}),
   MaterialController.searchMaterials 
)