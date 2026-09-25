require("dotenv").config();
const express = require("express");
const path = require("path");

const connectDB = require("./utils/db");
// const client = require('./utils/client.js');
const session = require("express-session");

const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

const limiter = rateLimiter({
  windowMs: 1000 * 60 * 3,
  limit: 100,
  statusCode: 429,
  message: {
    status: 429,
    error: "Too many requests",
    message: "Too many attempts done. Please try again after 3 minutes.",
  },
});
const registerRoutes = require("./routes/registerRoute.js");
const authRoutes = require("./routes/authRoute.js");
const enquiryRoutes = require("./routes/enquiryRoute.js");

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
app.use(express.urlencoded({ extended: false, limit: "15kb" }));
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      secure: true,
      sameSite: "lax",
      httpOnly: true,
    },
  }),
);
app.use("/api/v1/auth", limiter);
app.use("/api/v1", registerRoutes);
app.use("/api/v1", limiter, authRoutes);
app.use("/", enquiryRoutes);

app.get(["/", "/index.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get(["/signin", "/signin.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signin.html"));
});

app.get(["/signup", "/signup.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});

app.get(["/userDashboard", "/userDashboard.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "userDashboard.html"));
});

app.get(["/facultyDashboard", "/facultyDashboard.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "facultyDashboard.html"));
});

app.get(["/adminDashboard", "/adminDashboard.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "views", "adminDashboard.html"));
});

app.use((req, res) => {
  res.status(404).send("<h2> OOPS! HTTP ERROR-404 Page Not Found </h2>");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;
