const express = require("epxress");
const router = express.Router();

const validateUserRegistration = (req, res, next) => {
    let { name, phone, email, password, confirm_pass } = req.body;
    if (!name || !email || !password || !confirm_pass) {
        return res.status(400).send("All fields are mandatory");
    }

    name = name?.trim();
    email = email?.trim();
    phone = phone?.replace(/\s/g, "");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (!email.test(emailPattern)) {
        return res.status(400).send("Invalid email");
    }

    if (!phonePattern.test(phone)) {
        return res.status(400).send("Invalid phone number");
    }

    if (password.length < 8) {
        return res.status(400).send("Password length more than 8 or above characters");
    }

    if (password !== confirm_pass) {
        return res.status(400).send("Password not matched");
    }

    req.body.name = name;
    req.body.email = email;
    req.body.phone = phone;

    next();
};

const validateUserLogin = (req, res, next) => {
    let { name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).send("All fields are mandatory");
    }

    name = name?.trim();
    email = email?.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.test(emailPattern)) {
        return res.status(400).send("Invalid email");
    }

    if (password.length < 8) {
        return res.status(400).send("Password length more than 8 or above characters");
    }


    req.body.name = name;
    req.body.email = email;

    next();
};

module.exports = validateUserRegistration;
