const user = require('../models/userModel');
const bcrypt = require('bcrypt');

const userController = async function (req, res, next) {
    try {
        const { name, email, password } = req.body;
        const user_data = await user.findOne({
            email: email
        });

        if (!user_data) {
            return res.status(400).json({
                status: false,
                message: "Email not found. Register first."
            });
        }

        const passwordMatch = await bcrypt.compare(password,user_data.password);
        if (!passwordMatch) {
            return res.status(400).json({
                status: false,
                message: "Password does not match."
            });
        }

        req.user = user_data;
        next();

    } catch (error) {
        console.log("Error:", error);

        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

module.exports = userController;