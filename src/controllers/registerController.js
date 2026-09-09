const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerController = async function (req, res, next) {
    try {
        const {role, name, phone, email, password, confirm_pass } = req.body;
        let user_data = await User.findOne({
            email: email
        });

        if (user_data) {
            return res.status(400).json({
                status: false,
                message: "Email already exists."
            });
        }

        const phone_exist = await User.findOne({
            phone: phone,
        })

        if(phone_exist){
            return res.status(400).json({
                status : false,
                message : 'Phone number already exists.'
            })
        }

        const hashed_password = await bcrypt.hash(password,10);
        user_data = await User.create({
            role : role,
            name : name,
            phone : phone,
            email : email,
            password : hashed_password,
        })
        await user_data.save();

        req.User = user_data;
        
        next();

    } catch (error) {
        console.log("Error:", error);

        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};

module.exports = registerController;