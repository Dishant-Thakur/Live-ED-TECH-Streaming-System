const validateUserRegistration = (req, res, next) => {
    let {role, name, phone, email, password, confirm_pass } = req.body;

    if (!role || !name || !phone || !email || !password || !confirm_pass) {
         return res.status(400).json({
            status: false,
            message: "All fields are mandatory"
        });
    }

    name = name.trim();
    email = email.trim().toLowerCase();
    phone = phone.toString().replace(/\s/g, "");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (!emailPattern.test(email)) {
         return res.status(400).json({
            status: false,
            message: "Invalid email format"
        });
    }

    if (!phonePattern.test(phone)) {
         return res.status(400).json({
            status: false,
            message: "Please enter a vlaid phone number"
        });
    }

    if (password.length < 8) {
         return res.status(400).json({
            status: false,
            message: "Password must be 8 or more characters"
        });
    }

    if (password !== confirm_pass) {
         return res.status(400).json({
            status: false,
            message: "Password must be matched"
        });
    }
    req.body.name = name;
    req.body.email = email;
    req.body.phone = phone;

    next();
};

const validateUserLogin = (req, res, next) => {
    let { role, email, password } = req.body;

    if (!role || !email || !password) {
        return res.status(400).json({
            status: false,
            message: "All fields are mandatory"
        });
    }

    if (!["user", "faculty", "admin"].includes(role)) {
        return res.status(400).json({
            status: false,
            message: "Invalid role"
        });
    }

    email = email.trim().toLowerCase();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            status: false,
            message: "Invalid email format"
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            status: false,
            message: "Password must be 8 or more characters"
        });
    }

    req.body.email = email;
    next();
};
module.exports = { validateUserRegistration, validateUserLogin };