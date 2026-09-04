const express = require('express');
const router = express.Router();
const { validateUserLogin } = require('../middlewares/validateUserMiddleware');
const userController = require('../controllers/userController.js');

router.post("/auth/login", validateUserLogin, userController);
module.exports = router;