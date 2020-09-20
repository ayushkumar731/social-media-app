const catchAsync = require('../config/catchAsynch');
const Post = require('../models/posts');

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
    .populate('comments')
    .populate('likes');

  return res.render('home', {
    title: 'home page',
    posts: posts,
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
exports.emailVerification=catchAsync(async (req, res, next) => {
  return res.render('emailVerify',{ 
    title:'Email Verification'
  })
})