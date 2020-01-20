var LevelController = require('./controller');
const {app} = require('../../server')
const {
    CreateLevel,
    FetchLevelByDepartmentId,
    FetchLevel
} = require("../../constants/routes")
const passport = require('passport')
const {roleAuthorization} = require('../utils/roleAuthorization')


app.post(CreateLevel, 
    passport.authenticate('jwt', {session:false}),
    roleAuthorization(['admin']),
    LevelController.createLevel
);

app.get( FetchLevelByDepartmentId, 
    passport.authenticate('jwt', {session:false}),
    LevelController.getLevelByDepartmentId
);

app.get( FetchLevel, 
    passport.authenticate('jwt', {session:false}),
    LevelController.getAllLevel
);
