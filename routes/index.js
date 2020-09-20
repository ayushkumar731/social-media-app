const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homecontroller');
const authController = require('../controllers/api/v1/authController');

router.use('/api', require('./api'));
router.use('/accounts', require('./accounts'));

router.get('/',authController.isLoggedIn, homeController.home);
router.get('/email-verification',homeController.emailVerification)

module.exports = router;
