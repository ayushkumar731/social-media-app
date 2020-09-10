const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');
const handleFactory = require('./handleFactory');
const AppError = require('../../../config/AppError');
const catchAsync = require('../../../config/catchAsynch');

//********************CHECK POST****************//
exports.checkPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError('Post not found', 404));
  }
  next();
});

//**************SET USER AND POST ID ON COMMENT****************//
exports.setUserPostId = (req, res, next) => {
  //   console.log(req.user);
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.post) req.body.post = req.params.id;
  next();
};

//******************CREATE COMMENT DATA*********************//
exports.commentCreate = handleFactory.createOne(Comment, {
  path: 'user',
  select: 'name -_id',
});

//********************UPDATE COMMENT************************//
exports.updateCommet = handleFactory.updateOne(Comment);

//**********************DELETE COMMENT************************//
exports.deleteComment = handleFactory.deleteOne(Comment);

//********************GET ALL COMMENTS BY USER ID******************//
exports.getAllCommentsByUser = handleFactory.getAllDocsByUser(Comment);

//********************GET ALL COMMENTS BY POST ID******************//
exports.getAllCommentsByPost = handleFactory.getAllDocsByPost(Comment);

//********************GET ALL COMMENTS********************//
exports.getAllComments = handleFactory.getAllOne(Comment);
