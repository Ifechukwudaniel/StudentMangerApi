var LevelController = require('./controller');
const {app} = require('../../server')
const {
    CreateLevel
} = require("../../constants/routes")

app.post(CreateLevel, LevelController.createLevel);
