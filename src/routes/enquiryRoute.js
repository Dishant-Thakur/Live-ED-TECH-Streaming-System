const express = require("express");
const router = express.Router();
const validateEnquiry = require('../middlewares/validateEnquiry.js');
const enquiryController = require('../controllers/enquiryController.js');
 
router.post("/enquiry", validateEnquiry, enquiryController);
module.exports = router;
