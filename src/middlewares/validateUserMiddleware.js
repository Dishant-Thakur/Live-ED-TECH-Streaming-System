const validateUserRegistration = (req, res, next) => {
    let { name, phone, email, password, confirm_pass } = req.body;

    if (!name || !phone || !email || !password || !confirm_pass) {
        return res.status(400).send("All fields are mandatory");
    }

    name = name.trim();
    email = email.trim().toLowerCase();
    phone = phone.toString().replace(/\s/g, "");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (!emailPattern.test(email)) {
        return res.status(400).send("Invalid email format");
    }

    if (!phonePattern.test(phone)) {
        return res.status(400).send("Invalid phone number");
    }

    if (password.length < 8) {
        return res.status(400).send("Password must be 8 or more characters");
    }

    if (password !== confirm_pass) {
        return res.status(400).send("Passwords do not match");
    }

    req.body.name = name;
    req.body.email = email;
    req.body.phone = phone;

    next();
};

const validateUserLogin = (req, res, next) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("All fields are mandatory");
    }

    email = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).send("Invalid email format");
    }

    if (password.length < 8) {
        return res.status(400).send("Password must be 8 or more characters");
    }

    req.body.email = email;

    next();
};

module.exports = { validateUserRegistration, validateUserLogin };