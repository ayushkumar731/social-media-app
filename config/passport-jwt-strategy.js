const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
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

module.exports = passport;
