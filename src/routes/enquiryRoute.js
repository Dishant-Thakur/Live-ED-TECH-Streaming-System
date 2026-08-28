const express = require("express");
const router = express.Router();
const validateEnquiry = require('../middlewares/validateEnquiry.js');
const enquityController = require('../controllers/enquiryController.js');
 
router.post("/enquiry", validateEnquiry, enquityController);
module.exports = router;
