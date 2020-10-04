const axios = require('axios');
const  qs = require('qs');
const firebase = require('./firebase')
var HTMLParser = require('node-html-parser');
const uuid = require('uuid')
const filePath = `image/users/${uuid.v4()}.jpg`
const {imageUpload} = require('./app/utils/awsFile')
const {logInApi} = require('./app/utils/login')


logInApi('bas/csc/170044','password1')
.then(data=>{
  console.log(data)
})
.catch(err=>{
  console.log(err)
})