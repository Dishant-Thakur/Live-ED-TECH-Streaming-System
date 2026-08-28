const mongoose = require('mongoose');
const enquirySchema = new mongoose.Schema({
    name :{
        type : String,
        trim : true,
        required : true,
    },

    phone : {
        type : String,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
        required : true,
    },

    email :{
        type : String,
        trim : true,
    },

    course :{
        type : String,
        required : true,
    },

    qualification : {
        type : String,
        required : true,
    },

    status : {
        type : String,
        required : true,
    },

    goals : {
        type : String,
    },
    date : {
        type : Date,
        default : Date.now,
    },
})

const Enquiry = mongoose.model("Enquiry", enquirySchema);
module.exports = Enquiry;
