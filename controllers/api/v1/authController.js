const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

exports.create = async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  res.status(200).json({
    status: 'success',
    data: {
      newUser,
    },
  });
};
