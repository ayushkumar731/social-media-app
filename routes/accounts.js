const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homecontroller');

router.get('/signup', homeController.signup);
router.get('/login', homeController.login);
module.exports = router;
