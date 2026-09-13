const express = require('express');
const router = express.Router();

const { validateUserLogin } = require('../middlewares/validateUserMiddleware');
const authController = require('../controllers/authController.js');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware.js')

router.post("/auth/login", validateUserLogin, authController, authorizeMiddleware);
module.exports = router;