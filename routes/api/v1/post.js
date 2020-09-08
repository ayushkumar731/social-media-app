const express = require('express');
const router = express.Router();
const postController = require('../../../controllers/api/v1/postController');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router
  .route('/')
  .post(
    postController.uploadPostImages,
    postController.resizePostImages,
    postController.postCreate,
  )
  .get(postController.getAllPost);

router
  .route('/:id')
  .patch(postController.updatePost)
  .delete(postController.deletePost);

router.get('/:userId', postController.getAllPostByUser);

module.exports = router;
