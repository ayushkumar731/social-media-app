const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../../config/catchAsynch');
const AppError = require('../../../config/AppError');
const crypto = require('crypto');
const nodemailer = require('../../../config/nodemailer');

const signToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.toJSON());

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  });

  res.status(statusCode).json({
    status: 'success',
    data: {
      token,
      user,
    },
  });
};

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

exports.createSession = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Incorrect email/password', 401));
  }
  createSendToken(user, 200, req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  const resetToken = await user.changedPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/user/reset-password/${resetToken}`;

  const message = `Your Reset Password Link ${resetURL}`;

  try {
    await nodemailer({
      email: user.email,
      subject: 'Reset Password (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Check Your Email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'Something went wrong to send the mail, please try again later!',
        500,
      ),
    );
  }
});

exports.destroy = (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or expired', 400));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, req, res);
});
