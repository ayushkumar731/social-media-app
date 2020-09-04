const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

const User = require('../models/user');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

let opts = {
  jwtFromRequest: (req) => cookieExtractor(req),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id, function (err, user) {
      if (err) {
        console.log('error in finding user from JWT');
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }),
);

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};

module.exports = passport;
