const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homecontroller');

router.use('/api', require('./api'));
router.use('/accounts', require('./accounts'));

router.get('/', homeController.home);

module.exports = router;
