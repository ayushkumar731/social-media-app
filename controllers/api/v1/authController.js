const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../../config/catchAsynch');

exports.create = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  res.status(201).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});
