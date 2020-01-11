const controller = require('./controller');
const router = require('express').Router();

module.exports = function (app) {
  app.get('/', (req, res)=>{
    return res.send({data:"jwdjwd"})
  }
 );
};