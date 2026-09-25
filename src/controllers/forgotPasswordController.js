const User = require('../models/userModel');
const Faculty = require('../models/faculty.js');
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');

const forgotPasswordController = async function(req, res){
    try{
        let {email, newPassword, confirmPassword} = req.body;
        const [user_email, faculty_email, admin_email] = await Promise.all([
            User.findOne({email}),
            Faculty.findOne({email}),
            Admin.findOne({email}),
        ]) 
        if(!user_email || !faculty_email || !admin_email){
            return res.status(400).json({
                status: false,
                message: `This email is not registered. Please registered firat.`
            })
        }
        
        const hashed_password = await bcrypt.hash(newPassword, 10);
        let update_password_password = user_email || faculty_email || admin_email;
        await update_password_password.updateOne({
            $set : {
                password : hashed_password,
            }
        })
        console.log('Password update succesfully.')
    }
    catch(error){
        console.error('Server error failed to update password: ', error);
        return res.status(500).send({
            sucess : false,
            message : `Internal server error`,
        })
    }
}
module.exports = forgotPasswordController;
