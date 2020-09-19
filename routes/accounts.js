const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homecontroller');

router.get('/signup', homeController.signup);
router.get('/login', homeController.login);
router.get('/password/forgot',homeController.forgot)
module.exports = router;
