var LevelController = require('./controller');
const {app} = require('../../server')
const {
    CreateLevel,
    FetchLevelByDepartmentId
} = require("../../constants/routes")

app.post(CreateLevel, LevelController.createLevel);
app.get( FetchLevelByDepartmentId, LevelController.getLevelByDepartmentId)
