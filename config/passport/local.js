
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var passport = require('passport');

const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

var LocalStrategy = require('passport-local').Strategy;
var User = require('../../app/User/model');
var crypto = require('../../app/utils/crypto');
const config = require('../env/development')

/**
 * Expose
 */
// passport related code
passport.use(new LocalStrategy({
  usernameField: 'matricNumber',
  passwordField: 'password',
  session: false,
},
  function (matricNumber, password, done) {

    User.findOne({
      matricNumber,
    }, function (err, user) {
      
      if (err) return done(err);
      if (!user || crypto.decrypt(user.password) !== password) {
        return done(null, false, { message: 'Credential Error' });
      }
      return done(null, user);
    });
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : config.SECRET
},
function (jwtPayload, cb) {
  if(!jwtPayload){
      return cb({error:"Not authorized"})
  }
  User.findById(jwtPayload._id)
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          console.log(err)
          return cb(err);
      });
}
));