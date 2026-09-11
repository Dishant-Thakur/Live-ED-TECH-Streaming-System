const express = require('express');
const router = express.Router();

const { validateUserLogin } = require('../middlewares/validateUserMiddleware');
const authController = require('../controllers/authController.js');
const session_user_middleware = require('../middlewares/sessionUserMiddleware.js');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware.js')

router.post("/auth/login", validateUserLogin, authController, session_user_middleware, authorizeMiddleware);
module.exports = router;