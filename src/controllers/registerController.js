const User = require('../models/userModel');
const Faculty = require('../models/faculty.js');
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');

const registerController = async (req, res, next) => {
    try {
        const {role,name,phone,email,password,confirm_pass} = req.body;
        const [user_data, faculty_data, admin_data] = await Promise.all([
            User.findOne({ email }),
            Faculty.findOne({ email }),
            Admin.findOne({ email })
        ]);

        if (user_data || faculty_data || admin_data) {
            let existingRole;
            if (user_data) {
                existingRole = user_data.role;
            } else if (faculty_data) {
                existingRole = faculty_data.role || 'faculty';
            } else {
                existingRole = admin_data.role || 'admin';
            }

            return res.status(400).json({
                status: false,
                message: `This email is already registered with ${existingRole} role.`
            });
        }

        const [user_phone, faculty_phone, admin_phone] = await Promise.all([
            User.findOne({ phone }),
            Faculty.findOne({ phone }),
            Admin.findOne({ phone })
        ]);

        if (user_phone || faculty_phone || admin_phone) {
            return res.status(400).json({
                status: false,
                message: "Phone number already exists."
            });
        }
        if (password !== confirm_pass) {
            return res.status(400).json({
                status: false,
                message: "Passwords do not match."
            });
        }

        const hashed_password = await bcrypt.hash(password, 10);
        let new_user;
        if (role === 'user') {
           new_user = await User.create({
                role: 'user',
                name,
                phone,
                email,
                password: hashed_password
            });

        } else if (role === 'faculty') {
            new_user = await Faculty.create({
                role: 'faculty',
                name,
                phone,
                email,
                password: hashed_password
            });

        } else if (role === 'admin') {
            new_user = await Admin.create({
                role: 'admin',
                name,
                phone,
                email,
                password: hashed_password
            });

        } else {
            return res.status(400).json({
                status: false,
                message: "Invalid role."
            });
        }

        req.User = new_user;
        return res.redirect('/login.html');

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error."
        });
    }
};
module.exports = registerController;

