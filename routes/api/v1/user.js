const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../../../controllers/api/v1/authController');
const userController = require('../../../controllers/api/v1/userController');

//**************AUTH ROUTES********************************//
router.post('/create', authController.create);
router.post('/create-session', authController.createSession);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.get('/email-verify/:token', authController.emailVerify);
router.patch(
  '/update-password',
  passport.authenticate('jwt', { session: false }),
  authController.updatePassword,
);

router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  authController.destroy,
);

//***************USER ROUTES*************************//
router.use(passport.authenticate('jwt', { session: false }));

router
  .route('/profile/me')
  .get(userController.getMe, userController.getUser)
  .delete(userController.deleteMe)
  .patch(
    userController.uploadUserImage,
    userController.resizeUserImages,
    userController.updateMe,
  );

router.route('/profile/:id').get(userController.getUser);

module.exports = router;
