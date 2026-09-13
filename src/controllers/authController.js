const User = require('../models/userModel');
const Faculty = require('../models/faculty.js');
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');

const authController = async function (req, res, next) {
    try {
        const { role, email, password } = req.body;
        let account = null;
        if (role === 'user') {
            account = await User.findOne({ email });
        } 
        else if (role === 'faculty') {
            account = await Faculty.findOne({ email });
        } 
        else if (role === 'admin') {
            account = await Admin.findOne({ email });
        } 
        else {
            return res.status(400).json({
                status: false,
                message: "Invalid role."
            });
        }
        if (!account) {
            return res.status(400).json({
                status: false,
                message: `No ${role} account found. Please register first.`
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            account.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                status: false,
                message: "Password does not match."
            });
        }

        req.session.user = {
            id: account._id,
            role: account.role
        };

        next();

    } catch (error) {
        console.log("Error:", error);

        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

module.exports = authController;
