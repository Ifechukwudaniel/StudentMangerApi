'use strict';

/*
 * nodejs-express-mongoose
 */

/**
 * Module dependencies
 */

require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');

const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

var LocalStrategy = require('passport-local').Strategy;
var User = require('./app/User/model');
var crypto = require('./app/utils/crypto');
const port = process.env.PORT || 3000;

const app = express();

mongoose.connect(config.db, {useNewUrlParser:true, useUnifiedTopology:true});

const connection = mongoose.connection;

/**
 * Expose
 */

module.exports = {
  app,
  connection
};

// Bootstrap routes
require('./config/passport/local',(passport));
require('./config/express')(app, passport);
require("./app/Departments")
require('./app/Levels')
require('./app/Courses')
require('./app/User',(passport));

connection
   .on('error', console.error.bind(console, 'connection error:'))
  .once('open', ()=>{
        if (app.get('env') === 'test') return;
      app.listen(port);
      console.log('Express app started on port ' + port)
  });

// app.use(function (req, res, next) {
//     res.status(404).json({
//       success: false,
//     });
// });

