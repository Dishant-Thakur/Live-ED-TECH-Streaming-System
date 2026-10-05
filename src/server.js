require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./utils/db");
// const client = require('./utils/client.js');
const session = require("express-session");

const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

const registerRoutes = require("./routes/registerRoute.js");
const authRoutes = require("./routes/authRoute.js");
const enquiryRoutes = require("./routes/enquiryRoute.js");
const changePasswordRoute = require("./routes/forgotPasswordRoute.js");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
          "https://fonts.googleapis.com",
        ],
        fontSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
          "https://use.fontawesome.com",
          "https://fonts.gstatic.com",
          "data:",
        ],

        imgSrc: ["'self'", "data:", "blob:", "https:"],
        connectSrc: ["'self'", "https://cdn.jsdelivr.net"],
      },
    },
  }),
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "15kb" }));
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      secure: false,
      sameSite: "lax",
      httpOnly: true,
    },
  }),
);
app.use("/api/v1", registerRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", changePasswordRoute);
app.use("/", enquiryRoutes);

app.get(["/", "/index.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get(["courses", "/courses.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "courses.html"));
});

app.get(["about", "/about.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get(["contact", "/contact.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

app.get(["/signin", "/signin.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signin.html"));
});

app.get("/forgot.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "forgot.html"));
});
app.get("/OTP.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "OTP.html"));
});

app.get(["/signup", "/signup.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});

app.get(["/users", "/users.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "users.html"));
});

app.get(["/faculty", "/faculty.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "faculty.html"));
});

app.get(["/admin", "/admin.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin.html"));
});

app.use((req, res) => {
  res.status(404).send("<h2> OOPS! HTTP ERROR-404 Page Not Found </h2>");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;
