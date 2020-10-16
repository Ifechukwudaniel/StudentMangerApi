const User = require('./model');
const crypto = require('../utils/crypto');
const {logInApi} = require("../utils/login") 
const jwt = require('jsonwebtoken');
const {missingParameterError} = require("../utils/error")
const config = require('../../config')
const firebase = require('../../firebase')
const Department = require('./../Departments/model')
const Level = require('./../Levels/model')
const _ = require('lodash')
const {user, admin, staff} = require('../../constants/SchemaEnum')

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
  
  User.findOne({matricNumber:{ $regex: new RegExp("^" + matricNumber.toLowerCase(), "i") }})
  .then((value)=>{
     if(value){
         return res.status(500).send({error:` User with ${matricNumber} already exist` })
     }
     else{
         logInApi(matricNumber, password)
         .then(data=>{
            const {image, fullName, department, level } = data;
            Department.findOne({name: { $regex: new RegExp("^" + department.toLowerCase(), "i") }}).populate({path:'levels', select:'number '})
            .then((data)=>{
              let userLevel = _.find(data.levels, {number:level })
              if (!userLevel) {
                return res.status(500).send({error:" Your level has not being added to our database "})
              } else {
                console.log(data)
                let newUser =    new User({
                    image,
                    department:data._id,
                    level:userLevel._id,
                    name:fullName,
                    password:crypto.encrypt(password),
                    matricNumber:matricNumber.toUpperCase(),
                    role:user
                  })
                newUser.save()
                .then(()=>{
                  return res.send({message:'Successfully Signup'})
                })
              }
            })
            .catch((err)=>{
              return res.status(500).send({error:" Your department has not being added to our database "})
            })
         })
         .catch(err=>{
           return res.status(500).send({error:err.Message})
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
      .select("-password").populate({path:'department', select:'name'}).populate({path:'level', select:'number'})
      .lean().exec()
      .then(user =>res.json(user.map((data)=>{
         return {image: data.image, id:data._id, role:data.role,matricNumber:data.matricNumber,name:data.name, department:data.department?data.department.name : null, level:data.level?parseInt(data.level.number): null}
      })))
      .catch(e => {
        res.status(500).send({error:"An error occurred"})
        console.log(e)
      });
};

const getUsersByLevel = function (req, res, next) {
   const {level} = req.params;
    User.find({level})
    .select("-password").populate({path:'department', select:'name'}).populate({path:'level', select:'number'})
    .lean().exec()
    .then(user =>res.json(user.map((data)=>{
       return {image: data.image, id:data._id, role:data.role,matricNumber:data.matricNumber,name:data.name, department:data.department?data.department.name : null, level:data.level?parseInt(data.level.number): null, present:false}
    })))
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
             console.log(err,info);
            return res.status(400).json({
              error: 'User Id or Password is wrong',
            });
          }
          req.login(user, { session: false }, (err) => {
            if (err) {
              next(err);
            }
            user= user._doc
            // Provide data since user is not a proper serialized object
            let userData = {...user}
            Department.findById(user.department).
            then(data=>{
                 userData=({...user, department:data.name})
                Level.findById(user.level).
                  then(data=>{
                    userData.level=data.number
                    const token = jwt.sign(userData, config.SECRET);
                    return res.json({
                      success: true,
                      token,
                    });
                    
                })
             .catch(err=>{
               userData.level = ""
               console.log(err)
             })
            })
            .catch(err=>{
              userData.department = ""
              console.log(err)
            })
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


const changePassword= function (req,res, next) {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
  } = req.body;
  if(!currentPassword) 
  return res.status(500).send(missingParameterError("Please enter your current password"))
  if(!newPassword) 
  return res.status(500).send(missingParameterError(" Please enter your new password"))
  if(!confirmPassword) 
  return res.status(500).send(missingParameterError("Please confirm your  password"))

  if(newPassword!== confirmPassword) 
  return res.status(500).send({error:' confirm password did not match '})
  
  User.findById(req.user.id)
  .then((user)=>{
       user.password= crypto.encrypt(newPassword)
       user.save()
       .then(()=>{
          res.send({message:'Change Password SuccessFully '})
       })
  })
  .catch(()=>{
    return res.status(500).send({error:"Please this user does not exist"})
  })

}

module.exports = {
  register,
  getUsers,
  deleteUserById,
  login,
  getUserById,
  verifyToken,
  getUsersByLevel,
  changePassword
};