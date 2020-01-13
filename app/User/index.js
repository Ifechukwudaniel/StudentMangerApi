var Router = require('express').Router();
var UserController = require('./controller');
const {
  CreateUser,
  DeleteById,
  FetchUserById,
  FetchUserAllUser,
  Login
} = require("../../constants/routes")
const {app} = require("../../server")
const passport = require("passport")

  
app.post(CreateUser, UserController.register);
app.delete(DeleteById, UserController.deleteUserById)
app.get(FetchUserById, UserController.getUserById)
app.get(FetchUserAllUser, UserController.getUsers)
app.post(Login , UserController.login(passport))
