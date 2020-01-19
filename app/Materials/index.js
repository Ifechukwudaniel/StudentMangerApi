var MaterialController = require('./controller');
const {app} = require('../../server')
const {
   CreateMaterial,
   FetchMaterialsByCourseId
} = require("../../constants/routes")
const passport = require('passport')


app.post(CreateMaterial, 
   passport.authenticate('jwt', {session:false}),
   MaterialController.createMaterial
)

app.get(FetchMaterialsByCourseId,
   passport.authenticate('jwt', {session:false}),
   MaterialController.getMaterialByCourseId 
)

