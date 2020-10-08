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
const cors = require('cors')
const expressWs = require('express-ws')
const clearCache   = require('./services/cache')

const app = express();

expressWs(app)

app.use(cors())

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
require("./app/Materials")
require('./app/Blog')
require('./app/Comment')
require('./app/TimeTable')
require('./app/Attendance')
require('./app/Activity')

const wsHandler = (ws) => {
  // Add the connection to our set
  connections.add(ws)

  // We define the handler to be called everytime this
  // connection receives a new message from the client
  ws.on('message', (message) => {
    // Once we receive a message, we send it to all clients
    // in the connection set
    connections.forEach((conn) => conn.send(message))
  })

  // Once the client disconnects, the `close` handler is called
  ws.on('close', () => {
    // The closed connection is removed from the set
    connections.delete(ws)
  })
}


app.ws('/chat', wsHandler)


connection
   .on('error', console.error.bind(console, 'connection error:'))
  .once('open', ()=>{
        if (app.get('env') === 'test') return;
      app.listen(port);
      console.log('Express app started on port ' + port)
  });

app.use(function (req, res, next) {
    res.status(404).json({
      success: false,
    }); 
});
