const User = require("../models/userModel");
const Faculty = require("../models/faculty.js");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

const authController = async (req, res) => {
    try {
        const { role, email, password } = req.body;
        let account = null;

        if (role === "user") {
            account = await User.findOne({ email });
        } else if (role === "faculty") {
            account = await Faculty.findOne({ email });
        } else if (role === "admin") {
            account = await Admin.findOne({ email });
        } else {
            return res.status(400).json({
                status: false,
                message: "Invalid role."
            });
        }

        if (!account) {
            return res.status(400).json({
                status: false,
                message: "Account not found."
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            account.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                status: false,
                message: "Incorrect password."
            });
        }

        req.session.regenerate((error) => {
            if (error) {
                return res.status(500).json({
                    status: false,
                    message: "Unable to create session."
                });
            }
            
            req.session.user = {
                id: account._id,
                name: account.name,
                email: account.email,
                role: role
            };

            req.session.save((error) => {
                if (error) {
                    return res.status(500).json({
                        status: false,
                        message: "Unable to save session."
                    });
                }

                return res.status(200).json({
                    status: true,
                    message: "Login successful.",
                    role: role
                });
            });
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            status: false,
            message: "Internal server error."
        });
    }
};

module.exports = authController;