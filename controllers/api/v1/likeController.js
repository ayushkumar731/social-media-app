const catchAsync = require('../../../config/catchAsynch');
const AppError = require('../../../config/AppError');
const Like = require('../../../models/likes');
const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');

exports.like = catchAsync(async (req, res, next) => {
  let likeable;
  let deleted = false;

  if (req.query.type == 'Post') {
    likeable = await Post.findById(req.query.id).populate('likes');
  } else {
    likeable = await Comment.findById(req.query.id).populate('likes');
  }

  //if like allready exist
  let existingLike = await Like.findOne({
    likeable: req.query.id,
    onModel: req.query.type,
    user: req.user._id,
  });

  if (existingLike) {
    likeable.likes.remove(existingLike._id);
    likeable.save();

    existingLike.remove();
    deleted = true;
  } else {
    let newLike = await Like.create({
      user: req.user._id,
      likeable: req.query.id,
      onModel: req.query.type,
    });

    likeable.likes.push(newLike._id);
    likeable.save();
  }

  return res.status(200).json({
    status: 'success',
    data: {
      deleted,
    },
  });
});
