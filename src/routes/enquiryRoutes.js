const express = require("express");
const router = express.Router();
const transporter = require("../utils/mailer");

function validateEnquiry(req, res, next) {
  let { name, phone, email, course, timing, mode, qualification, status } =
    req.body;

  name = name?.trim();
  email = email?.trim();
  phone = phone?.replace(/\s/g, "");

  if (
    !name ||
    !phone ||
    !email ||
    !course ||
    !timing ||
    !mode ||
    !qualification ||
    !status
  ) {
    return res.status(400).send("All fields are mandatory");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[6-9]\d{9}$/;

  if (!emailPattern.test(email)) {
    return res.status(400).send("Invalid email");
  }

  if (!phonePattern.test(phone)) {
    return res.status(400).send("Invalid phone number");
  }

  name = name.trim();
  email = email.trim().toLowerCase();
  phone = phone.replace(/\s/g, "");

  next();
}

router.post("/enquiry", validateEnquiry, async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      course,
      timing,
      mode,
      qualification,
      status,
      goals,
    } = req.body;

    await transporter.sendMail({
      from: `"EdTech Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
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
                    </tr>


                    <tr>
                        <td style="padding:10px;font-weight:bold;">
                            Preferred Batch
                        </td>

                        <td style="padding:10px;">
                            ${timing}
                        </td>
                    </tr>


                    <tr style="background:#f8f9fa;">
                        <td style="padding:10px;font-weight:bold;">
                            Learning Mode
                        </td>

                        <td style="padding:10px;">
                            ${mode}
                        </td>
                    </tr>


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
                        Reply to this email to contact
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
    return res
      .status(200)
      .send(
        "<h2>Dear user your query send successfully.Our team will contact you further.</h2>",
      );
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).send("Unable to submit enquiry");
  }
});
module.exports = router;
