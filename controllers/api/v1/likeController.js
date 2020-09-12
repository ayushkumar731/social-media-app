const catchAsync = require('../../../config/catchAsynch');
const AppError = require('../../../config/AppError');
const Like = require('../../../models/likes');
const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');

exports.like = catchAsync(async (req, res, next) => {
  let likable;
  let deleted = false;

  if (req.query.type == 'post') {
    likable = await Post.findById(req.query.id).populate('likes');
  } else {
    likable = await Comment.findById(req.query.id).populate('likes');
  }

  //if like allready exist
  let existingLike = await Like.findOne({
    likeable: req.query.id,
    onModel: req.query.type,
    user: req.user._id,
  });

  if (existingLike) {
    likable.likes.pull(existingLike._id);
    likable.save();

    existingLike.remove();
    deleted = true;
  } else {
    let newLike = await Like.create({
      user: req.user._id,
      likeable: req.query.id,
      onModel: req.query.type,
    });

    likable.likes.push(newLike._id);
    likable.save();
  }

  return res.status(200).json({
    status: 'success',
    data: {
      deleted,
    },
  });
});
