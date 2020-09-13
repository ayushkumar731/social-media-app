const Friend = require('../../../models/friendships');
const User = require('../../../models/user');
const catchAsync = require('../../../config/catchAsynch');
const AppError = require('../../../config/AppError');

exports.friend = catchAsync(async (req, res, next) => {
  let fromUser = await User.findById(req.user._id);
  let toUser = await User.findById(req.query.id);
  let deleted = false;

  const existingFriend = await Friend.findOne({
    from_user: req.user._id,
    to_user: req.query.id,
  });

  if (existingFriend) {
    toUser.friends.pull(existingFriend._id);
    fromUser.friends.pull(existingFriend._id);
    toUser.save();
    fromUser.save();
    existingFriend.remove();
    deleted = true;
  } else {
    const newFriend = await Friend.create({
      from_user: req.user._id,
      to_user: req.query.id,
    });

    toUser.friends.push(newFriend);
    fromUser.friends.push(newFriend);
    toUser.save();
    fromUser.save();
  }
  return res.status(200).json({
    status: 'success',
    data: deleted,
  });
});
