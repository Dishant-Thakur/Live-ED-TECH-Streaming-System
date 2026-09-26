const User = require("../models/userModel");
const Faculty = require("../models/faculty.js");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

const forgotPasswordController = async function (req, res) {
  try {
    const { email, newPassword} = req.body;
    const [user, faculty, admin] = await Promise.all([
      User.findOne({ email }),
      Faculty.findOne({ email }),
      Admin.findOne({ email }),
    ]);

    if (!user && !faculty && !admin) {
      return res.status(400).json({
        status: false,
        message: "This email is not registered.",
      });
    }

    const account = user || faculty || admin;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await account.updateOne({
      $set: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Server error failed to update password:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
module.exports = forgotPasswordController;
