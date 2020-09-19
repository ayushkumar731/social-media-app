const catchAsync = require('../config/catchAsynch');

module.exports.home = catchAsync(async (req, res, next) => {
  return res.render('home', {
    title: 'home page',
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  return res.render('sign-up', {
    title: 'Sign up',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  return res.render('sign-in', {
    title: 'Login',
  });
});

exports.forgot = catchAsync(async (req, res, next) => {
  return res.render('forgot', {
    title: 'Reset Password',
  });
});
