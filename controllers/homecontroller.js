const catchAsync = require('../config/catchAsynch');
const Post = require('../models/posts');
const User = require('../models/user');
const AppError = require('../config/AppError');

module.exports.home = catchAsync(async (req, res, next) => {
  const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
      populate: {
        path: 'likes',
      },
    })
    .populate('likes');

  return res.render('home', {
    title: 'home page',
    posts: posts,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    return res.redirect('back');
  }
  return res.render('sign-up', {
    title: 'Sign up',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    return res.redirect('back');
  }
  return res.render('sign-in', {
    title: 'Login',
  });
});

exports.forgot = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    return res.redirect('back');
  }
  return res.render('forgot', {
    title: 'Reset Password',
  });
});
exports.emailVerification = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    return res.redirect('back');
  }
  return res.render('emailVerify', {
    title: 'Email Verification',
  });
});

exports.resetForgotPass = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    return res.redirect('back');
  }
  return res.render('reset-password', {
    title: 'Reset Password',
  });
});

exports.profile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User Not Found'));
  }
  const post = await Post.find({ user: req.params.id });

  return res.render('profile', {
    title: ` profile | ${user.name}`,
    posts: post,
    user: user,
  });
});

exports.profileSettings = catchAsync(async (req, res, next) => {
  return res.render('setting', {
    title: 'Settings',
  });
});
