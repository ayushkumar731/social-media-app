const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../../../controllers/api/v1/authController');

router.post('/create', authController.create);
router.post('/create-session', authController.createSession);

router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  authController.destroy,
);
module.exports = router;
