const User = require("../models/userModel");
const Faculty = require("../models/faculty.js");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  try {
    const { role, name, phone, email, password, confirm_pass } = req.body;

    if (!["user", "faculty", "admin"].includes(role)) {
      return res.status(400).json({
        status: false,
        message: "Invalid role.",
      });
    }

    if (!name || !phone || !email || !password || !confirm_pass) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [userData, facultyData, adminData] = await Promise.all([
      User.findOne({ email: normalizedEmail }),
      Faculty.findOne({ email: normalizedEmail }),
      Admin.findOne({ email: normalizedEmail }),
    ]);

    if (userData || facultyData || adminData) {
      return res.status(400).json({
        status: false,
        message: "This email is already registered.",
      });
    }

    const [userPhone, facultyPhone, adminPhone] = await Promise.all([
      User.findOne({ phone }),
      Faculty.findOne({ phone }),
      Admin.findOne({ phone }),
    ]);

    if (userPhone || facultyPhone || adminPhone) {
      return res.status(400).json({
        status: false,
        message: "Phone number already exists.",
      });
    }

    if (password !== confirm_pass) {
      return res.status(400).json({
        status: false,
        message: "Passwords do not match.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const Model = role === "user" ? User : role === "faculty" ? Faculty : Admin;

    await Model.create({
      role,
      name,
      phone,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: true,
      message: "Registration successful. Please login.",
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

module.exports = registerController;
