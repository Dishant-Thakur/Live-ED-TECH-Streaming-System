const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerController = async (req, res, next) => {
    try {
        const {role,name,phone, email,password,confirm_pass} = req.body;
        console.log(req.body);
        const user_data = await User.findOne({ email });

        if (user_data) {
            return res.status(400).json({
                status: false,
                message: `This email is already registered with ${user_data.role} role.`
            });
        }
        const phone_exist = await User.findOne({ phone });

        if (phone_exist) {
            return res.status(400).json({
                status: false,
                message: "Phone number already exists."
            });
        }

        const hashed_password = await bcrypt.hash(password, 10);
        const new_user = await User.create({
            role,
            name,
            phone,
            email,
            password: hashed_password
        });

        req.User = new_user;

        return res.redirect('/login.html');

    } catch (error) {
        console.log("Error:", error);

        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

module.exports = registerController;