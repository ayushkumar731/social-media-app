const multer = require('multer');
const sharp = require('sharp');
const Post = require('../../../models/posts');
const catchAsync = require('../../../config/catchAsynch');
const AppError = require('../../../config/AppError');
const post = require('../../../models/posts');
const handleFactory = require('./handleFactory');

//***************MULTER*********************************//
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please upload Image!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPostImages = upload.array('images', 5);

//RESIZE IMAGES
exports.resizePostImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];

  await Promise.all(
    req.files.map(async (file, i) => {
      const filename = `post-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`assets/img/posts/${filename}`);

      req.body.images.push(filename);
    }),
  );
  next();
});

//********************SET USER ID ON POST****************//
exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

//********************UPDATE POST************************//
exports.updatePost = catchAsync(async (req, res, next) => {
  //FIND POST
  const postUser = await Post.findById(req.params.id);

  //IF POST NOT FOUND WITH THAT ID
  if (!postUser) {
    return next(new AppError('No post found with this id', 404));
  }

  //POST NOT RELATED WITH CURRENT USER THEN THROW AN ERROR
  if (postUser.user.id != req.user.id) {
    return next(
      new AppError('You do not have permission to perform this action', 404),
    );
  }

  // IF RELATED THEN UPDATE POST
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  //IF POST NOT FOUND WITH THAT ID
  if (!updatedPost) {
    return next(new AppError('No post found with this id', 404));
  }

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: updatedPost,
  });
});

//******************CREATE POST DATA*********************//
exports.postCreate = handleFactory.createOne(Post, {
  path: 'user',
  select: 'name -_id',
});

//**********************DELETE POST************************//
exports.deletePost = handleFactory.deleteOne(Post);

//********************GET ALL POSTS BY USER ID******************//
exports.getAllPostByUser = handleFactory.getAllDocsByUser(Post);

//********************GET ALL POSTS********************//
exports.getAllPost = handleFactory.getAllOne(Post);
