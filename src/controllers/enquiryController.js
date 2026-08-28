const Enquiry = require('../models/enquiryModel');
const transporter = require("../utils/mailer");

const enquityController = async(req,res)=>{
  try {
    let {name, phone, email, course, qualification, status, goals,} = req.body;
    await transporter.sendMail({
      from: `"EdTech" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject: `New Course Enquiry - ${course}`,
      html: `
    <div style="
        background:#f4f7fb;
        padding:30px 15px;
        font-family:Arial, sans-serif;
    ">
        <div style="
            max-width:650px;
            margin:auto;
            background:#ffffff;
            border-radius:12px;
            overflow:hidden;
            box-shadow:0 4px 15px rgba(0,0,0,0.08);
        ">

            <div style="
                background:#0d6efd;
                color:white;
                padding:25px;
                text-align:center;
            ">
                <h2 style="margin:0;">
                    New Course Enquiry
                </h2>

                <p style="margin:8px 0 0;">
                    A student is interested in your course
                </p>
            </div>

            <div style="padding:30px;">
                <h3 style="
                    color:#0d6efd;
                    margin-top:0;
                ">
                    Student Information
                </h3>

                <table style="
                    width:100%;
                    border-collapse:collapse;
                    font-size:15px;
                ">
                    <tr>
                        <td style="padding:10px;font-weight:bold;">
                            Name
                        </td>

                        <td style="padding:10px;">
                            ${name}
                        </td>
                    </tr>

                    <tr style="background:#f8f9fa;">
                        <td style="padding:10px;font-weight:bold;">
                            Email
                        </td>

                        <td style="padding:10px;">
                            ${email}
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:10px;font-weight:bold;">
                            Phone
                        </td>

                        <td style="padding:10px;">
                            ${phone}
                        </td>
                    </tr>

                    <tr style="background:#f8f9fa;">
                        <td style="padding:10px;font-weight:bold;">
                            Course
                        </td>

                        <td style="padding:10px;">
                            ${course}
                        </td>
                    </tr>>
   
                    <tr>
                        <td style="padding:10px;font-weight:bold;">
                            Qualification
                        </td>

                        <td style="padding:10px;">
                            ${qualification}
                        </td>
                    </tr>

                    <tr style="background:#f8f9fa;">
                        <td style="padding:10px;font-weight:bold;">
                            Current Status
                        </td>

                        <td style="padding:10px;">
                            ${status}
                        </td>
                    </tr>

                </table>
                <div style="
                    margin-top:25px;
                    background:#f8f9fa;
                    padding:18px;
                    border-radius:8px;
                ">

                    <strong>Student's Learning Goal</strong>

                    <p style="
                        margin-bottom:0;
                        line-height:1.6;
                    ">
                        ${goals || "Not provided"}
                    </p>
                </div>

                <div style="
                    margin-top:25px;
                    text-align:center;
                ">

                    <p style="color:#666;">
                        Thanks for visit 
                        <strong>${name}</strong>.
                    </p>
                </div>
            </div>

            <div style="
                background:#212529;
                color:#ffffff;
                text-align:center;
                padding:15px;
                font-size:13px;
            ">
                EdTech Course Enquiry System
            </div>
        </div>
    </div>
    `,
    });

    console.log('Email sent succesfully');
    const enquiry = await Enquiry.create({
      name : name,
      phone : phone,
      email : email,
      course : course,
      qualification :qualification,
      status : status,
      goals : goals,
    });
    await enquiry.save();
    return res.status(200).send("<h2>Dear user your query send successfully.Our team will contact you further.</h2>");
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).send("Unable to submit enquiry");
  }
}

module.exports = enquityController;