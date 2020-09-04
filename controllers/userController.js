const User = require('../models/user');
const catchAsync = require('../config/catchAsynch');

exports.getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    status: 'success',
    results: user.length,
    data: user,
  });
});
