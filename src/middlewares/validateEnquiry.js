function validateEnquiry(req, res, next) {
let { name, phone, email, course, qualification, status } = req.body;

  name = name?.trim();
  email = email?.trim().toLowerCase();
  phone = phone?.replace(/\s/g, "");
  console.log(req.body);

  if (!name || !phone || !email || !course || !qualification || !status) {
    return res.status(400).json({
        success: false,
        message :'Dear user please fill all the fields',
    })
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const phonePattern = /^[6-9]\d{9}$/;

  if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message :'Please enter valid email user',
    });
  }

  if (!phonePattern.test(phone)) {
      return res.status(400).json({
        success: false,
        message :'Please enter valid number user',
    });;
  }
    req.body.name = name;
    req.body.email = email;
    req.body.phone = phone;
  next();
}

module.exports = validateEnquiry;