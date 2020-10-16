var Router = require('express').Router();
var UserController = require('./controller');
const {
  CreateUser,
  DeleteById,
  FetchUserById,
  FetchUserAllUser,
  Login,
  VerifyToken,
  FetchUserByLevel,
  ChangePassword
} = require("../../constants/routes")
const {
  app
} = require("../../server")
const passport = require("passport")
const {
  roleAuthorization
} = require('../utils/roleAuthorization')


app.post(CreateUser,
  UserController.register
);


app.post(ChangePassword,
  passport.authenticate('jwt', {
    session: false
  }),
  UserController.changePassword
);

app.delete(DeleteById,
  passport.authenticate('jwt', {
    session: false
  }),
  roleAuthorization(['admin']),
  UserController.deleteUserById
)

app.get(FetchUserById,
  passport.authenticate('jwt', {
    session: false
  }),
  roleAuthorization(['admin']),
  UserController.getUserById
)

app.get(FetchUserAllUser,
  passport.authenticate('jwt', {
    session: false
  }),
  roleAuthorization(['admin']),
  UserController.getUsers
)

app.get(FetchUserByLevel,
  passport.authenticate('jwt', {
    session: false
  }),
  roleAuthorization(['admin']),
  UserController.getUsersByLevel
)

app.post(Login, UserController.login(passport))

app.post(VerifyToken, UserController.verifyToken)