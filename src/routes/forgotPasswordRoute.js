const forgotPassword = require('../middlewares/forgot');
const forgotPasswordController = require('../controllers/forgotPasswordController');
const express = require('express');
const router = express.Router();

router.patch("/auth/change-password", forgotPassword,forgotPasswordController);
module.exports = router;