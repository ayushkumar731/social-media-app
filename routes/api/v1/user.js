const express = require('express');
const router = express.Router();

const authController = require('../../../controllers/api/v1/authController');

router.post('/create', authController.create);
module.exports = router;
