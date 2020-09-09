const User = require('./model');
const crypto = require('../utils/crypto');
const {logInApi} = require("../utils/login") 
const jwt = require('jsonwebtoken');
const {missingParameterError} = require("../utils/error")
const config = require('../../config')
const firebase = require('../../firebase')

const register = function (req, res, next, isLogin=false) {
  const {
    matricNumber,
    password,
    role,
  } = req.body;

  if(!matricNumber) 
    return res.status(500).send(missingParameterError(" Missing matric number"))
  
  if(!password) 
    return res.status(500).send(missingParameterError(" Missing password"))
  
  User.findOne({matricNumber:matricNumber.toUpperCase().trim()})
  .then((value)=>{
     if(value){
      return res.status(500).send({error:` User with ${matricNumber} already exist` })
     }
     else{
        const userData = logInApi(matricNumber, password)
        .then(value=>{
            const hashedPassword = crypto.encrypt(password);
            const user = new User({
              matricNumber:value.MATRIC_NO,
              name:value.FULL_NAME,
              password: hashedPassword,
              role: role ? 'admin' : 'user',
            })
            firebase.database().ref()
            .child('users')
            .push({
             matricNumber:user.matricNumber,
             name:user.name,
            })
            user
              .save()
              .then((user) => { 
                  return res.json({
                    user,
                    success: true,
                  });
              })
              .catch(e => {
                 console.log(e)
                return res.status(500).send({error:` An error occurred` })
              });
       })
       .catch(value=>{
        return res.status(500).send(value)
       })
      }})


};

const getUserById = function (req, res, next) {
  const {
    userId
  } = req.params;

  if(!userId) 
  return res.status(500).send(missingParameterError(" Missing UserId"))

    User
      .findById(userId)
      .exec()
      .then(user => {
        if(!user)
          return res.status(500).send({error:`There was know user found with this ${userId}` })
       return res.json(user)
      })
      .catch(e => {
        return res.status(500).send({error:`An error occurred` })
      });
};

const getUsers = function (req, res, next) {
    User
      .find({})
      .select("-password")
      .exec()
      .then(user =>res.json(user))
      .catch(e => {
        res.status(500).send({error:"An error occurred"})
        console.log(e)
      });
};

/* Delete a user */
const deleteUserById = function (req, res, next) {
  const {
    userId
  } = req.params;
  console.log(userId)
  User
    .findByIdAndRemove(userId)
    .exec()
    .then((user) => {
       return   res.json({ message: `Successfully delete user ${user.name}` })
    })
    .catch(e => {
      return res.status(500).send({error:` Could not delete user` })
    });
};

// Login is a curried function which takes passport
const login = function (passport) {
  return function (req, res, next) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
          if (err || !user) {
             console.log(user);
            return res.status(400).json({
              error: 'User Id or Password is wrong',
            });
          }
          req.login(user, { session: false }, (err) => {
            if (err) {
              next(err);
            }
            // Provide data since user is not a proper serialized object
            const token = jwt.sign(user.toObject(), config.SECRET);
            return res.json({
              success: true,
              token,
            });
          });
        })(req, res);
      }
};

const verifyToken = (req, res, next)=>{
  const {
    token
  } = req.body
  if(!token){
    return res.status(500).send(missingParameterError("Missing Token"))
  }
  confirmToken(token).then((value)=>{
     return res.send({token:token})
  })
  
}

function confirmToken(token) {
  return new Promise((resolve, reject)=>{
  const userData =  jwt.verify(token,config.SECRET)
   User.findById(userData._id)
  .then((user)=>{
    if (user.matricNumber===userData.matricNumber && user.password=== userData.password) {
        resolve(true)
    }
    else
       reject(false)

  })
  .catch(()=>{
    reject(false)
  })
})
}


module.exports = {
  register,
  getUsers,
  deleteUserById,
  login,
  getUserById,
  verifyToken
};