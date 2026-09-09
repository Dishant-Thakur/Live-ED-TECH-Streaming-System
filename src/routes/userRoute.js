const express = require('express');
const router = express.Router();

const { validateUserLogin } = require('../middlewares/validateUserMiddleware');
const userController = require('../controllers/userController.js');
const session_user_middleware = require('../middlewares/sessionUserMiddleware.js');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware.js')

router.post("/auth/login", validateUserLogin, userController, session_user_middleware, authorizeMiddleware);
module.exports = router;