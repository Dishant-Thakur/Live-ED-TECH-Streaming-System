function validateEnquiry(req, res, next) {
let { name, phone, email, course, qualification, status } = req.body;
  console.log(req.body);

  name = name?.trim();
  email = email?.trim().toLowerCase();
  phone = phone?.replace(/\s/g, "");

  if (!name || !phone || !email || !course || !qualification || !status) {
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

    req.body.name = name;
    req.body.email = email;
    req.body.phone = phone;

  next();
}

module.exports = validateEnquiry;