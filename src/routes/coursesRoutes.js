const express = require('express');
const router = express.Router();
const {createCourses, getAllCourses} = require('../controllers/coursesController');

router.get('/',getAllCourses);
router.post('/',createCourses);

module.exports = router;