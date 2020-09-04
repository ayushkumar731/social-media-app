const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.getAllUser,
);

module.exports = router;
