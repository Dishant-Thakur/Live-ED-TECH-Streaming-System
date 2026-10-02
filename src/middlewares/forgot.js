const forgot_password = function(req, res, next) {
    let { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
        return res.status(400).json({
            status: false,
            message: "Email, new password and confirm password are required."
        });
    }

    email = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            status: false,
            message: "Invalid email format."
        });
    }

    if (newPassword.length < 8) {
        return res.status(400).json({
            status: false,
            message: "Password must be 8 or more characters."
        });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            status: false,
            message: "New password and confirm password do not match."
        });
    }

    req.body.email = email;
    req.body.newPassword = newPassword;

    next();
};

module.exports = forgot_password;