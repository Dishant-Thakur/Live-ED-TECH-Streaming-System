const express = require('express');
const router = express.Router();
const {validateUserRegistration} = require('../middlewares/validateUserMiddleware');
const registerController = require('../controllers/registerController');

router.post('auth/register',validateUserRegistration, registerController);
module.exports = router;