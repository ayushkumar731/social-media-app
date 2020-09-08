const catchAsync = require('../../../config/catchAsynch');
const AppError = require('../../../config/AppError');
const fs = require('fs');
const path = require('path');

//******************CREATE DOC DATA*********************//
exports.createOne = (Model, poptOptions) =>
  catchAsync(async (req, res, next) => {
    //CREATE
    let doc = await Model.create(req.body);

    if (poptOptions) {
      doc = await doc.populate(poptOptions).execPopulate();
    }

    //SEND RESPONSE
    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

//********************UPDATE DOC************************//
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    //FIND DOC
    const checkUser = await Model.findById(req.params.id);

    //IF DOC NOT FOUND WITH THAT ID
    if (!checkUser) {
      return next(new AppError('No doc found with this id', 404));
    }

    //DOC NOT RELATED WITH CURRENT USER THEN THROW AN ERROR
    if (checkUser.user.id != req.user.id) {
      return next(
        new AppError('You do not have permission to perform this action', 404),
      );
    }

    // IF RELATED THEN UPDATE DOC
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    //IF DOC NOT FOUND WITH THAT ID
    if (!updatedDoc) {
      return next(new AppError('No doc found with this id', 404));
    }

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: updatedDoc,
    });
  });

//**********************DELETE DOC************************/
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.file, req.user.id);
    // FIND POST
    const checkUser = await Model.findById(req.params.id);

    //IF POST ARE NOT RELATED WITH THE ID
    if (!checkUser) {
      return next(new AppError('No doc found with that id', 404));
    }

    //IF POST ARE NOT RELATED WITH THE CURRENT USER THEN THROW AN ERROR
    if (checkUser.user.id != req.user.id) {
      return next(
        new AppError('You do have permission to perform this action', 404),
      );
    }

    if (checkUser.images) {
      checkUser.images.forEach((el) => {
        fs.unlinkSync(path.join(__dirname, '../../../assets/img/posts', el));
      });
    }

    //DELETE POST
    const deleteDoc = await Model.findByIdAndDelete(req.params.id);

    //IF POST ARE NOT RELATED WITH THE ID
    if (!deleteDoc) {
      return next(new AppError('No doc found with that id', 404));
    }

    //SEND RESPONSE
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

//********************GET ALL DOCS BY USER ID******************//
exports.getAllDocsByUser = (Model) =>
  catchAsync(async (req, res, next) => {
    //FIND DOC
    const doc = await Model.find({ user: req.params.id });

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });

//********************GET ALL DOCS********************//
exports.getAllOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // FIND DOC (LETEST TO OLDEST)
    const doc = await Model.find().sort('-createdAt');

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });
