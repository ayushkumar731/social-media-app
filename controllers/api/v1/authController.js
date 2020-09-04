const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../../config/catchAsynch');
const AppError = require('../../../config/AppError');
const crypto = require('crypto');
const nodemailer = require('../../../config/nodemailer');

// to generate token
const signToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//to send response
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

//to create a new user
exports.create = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const verifyToken = await newUser.emailVerify();
  await newUser.save({ validateBeforeSave: false });

  const verifyURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/user/email-verify/${verifyToken}`;

  const message = `Your Email verification Link ${verifyURL}`;

  try {
    await nodemailer({
      email: newUser.email,
      subject: 'For verify Yor email',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Check Your Email',
    });
  } catch (err) {
    newUser.emailVerificationToken = undefined;
    await newUser.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'Something went wrong to send the mail, please try again later!',
        500,
      ),
    );
  }
});

//for email verification
exports.emailVerify = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
  });

  if (!user) {
    return next(new AppError('Token is invalid', 400));
  }

  user.emailVerification = 'true';
  user.emailVerificationToken = undefined;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    message: 'Your email verfication is successfull',
  });
});

// to login the user
exports.createSession = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (user.emailVerification === false) {
    return next(new AppError('verify your email', 401));
  }
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Incorrect email/password', 401));
  }

  createSendToken(user, 200, req, res);
});

// to mail for forget password
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

//to logout the user
exports.destroy = (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

//to reset password
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
