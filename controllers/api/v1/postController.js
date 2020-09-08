const multer = require('multer');
const sharp = require('sharp');
const Post = require('../../../models/posts');
const catchAsync = require('../../../config/catchAsynch');
const AppError = require('../../../config/AppError');
const catchAsynch = require('../../../config/catchAsynch');

//***************MULTER*********************************//
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log(file.mimetype);
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

//******************CREATE POST DATA*********************//
exports.postCreate = catchAsync(async (req, res, next) => {
  //CREATE POST
  let post = await Post.create({
    content: req.body.content,
    user: req.user._id,
    images: req.body.images,
  });

  //POPULATE USER
  post = await post.populate('user', 'name -_id').execPopulate();

  //SEND RESPONSE
  res.status(201).json({
    status: 'success',
    data: {
      post,
    },
  });
});

//********************UPDATE POST************************//
exports.updatePost = catchAsync(async (req, res, next) => {
  //FIND POST
  const postUser = await Post.findById(req.params.id);

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

//**********************DELETE POST************************//
exports.deletePost = catchAsync(async (req, res, next) => {
  // FIND POST
  const postUser = await Post.findById(req.params.id);

  //IF POST ARE NOT RELATED WITH THE CURRENT USER THEN THROW AN ERROR
  if (postUser.user.id != req.user.id) {
    return next(
      new AppError('You do have permission to perform this action', 404),
    );
  }

  //DELETE POST
  const deletePost = await Post.findByIdAndDelete(req.params.id);

  //IF POST ARE NOT RELATED WITH THE ID
  if (!deletePost) {
    return next(new AppError('No post found with that id', 404));
  }

  //SEND RESPONSE
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

//********************GET ALL POSTS BY USER ID******************//
exports.getAllPostByUser = catchAsync(async (req, res, next) => {
  //FIND POST
  const posts = await Post.find({ user: req.params.userId });

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      post,
    },
  });
});

//********************GET ALL POSTS********************//
exports.getAllPost = catchAsynch(async (req, res, next) => {
  // FIND POST (LETEST TO OLDEST)
  const posts = await Post.find().sort('-createdAt');

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: posts,
  });
});
