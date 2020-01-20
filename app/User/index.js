var Router = require('express').Router();
var UserController = require('./controller');
const {
  CreateUser,
  DeleteById,
  FetchUserById,
  FetchUserAllUser,
  Login,
  VerifyToken
} = require("../../constants/routes")
const {app} = require("../../server")
const passport = require("passport")
const {roleAuthorization} = require('../utils/roleAuthorization')

  
app.post(CreateUser,
  passport.authenticate('jwt', {session:false}),
  UserController.register
);

app.delete(DeleteById,
  passport.authenticate('jwt', {session:false}),
  roleAuthorization(['admin']),
  UserController.deleteUserById
)

app.get(FetchUserById, 
  passport.authenticate('jwt', {session:false}),
  UserController.getUserById
)

app.get(FetchUserAllUser, 
  passport.authenticate('jwt', {session:false}),
  roleAuthorization(['admin']),
  UserController.getUsers
)

app.post(Login , UserController.login(passport))

app.post(VerifyToken, UserController.verifyToken)
