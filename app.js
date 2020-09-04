const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/mongoose');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./config/AppError');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const jwtPassport = require('./config/passport-jwt-strategy');

//body-parser to read the body with req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.use(globalErrorHandler);

module.exports = app;
