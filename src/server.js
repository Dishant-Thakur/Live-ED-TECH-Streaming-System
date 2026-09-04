const express = require("express");
const path = require("path");
const connectDB = require("./utils/db")
const rateLimiter = require('express-rate-limit');
require("dotenv").config();

const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

const limiter = rateLimiter({
    windowMs: 1000 * 60 * 15,
    limit: 5,
    statusCode: 429,
    message: {
        status: 429,
        error: 'Too many requests',
        message: "Too many attempts done. Please try again after 15 minutes."
    },
});
const userRoutes = require("./routes/userRoute.js");
const enquiryRoutes = require("./routes/enquiryRoute.js");

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],

                scriptSrc: [
                    "'self'",
                    "https://cdn.jsdelivr.net"
                ],

                styleSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://cdn.jsdelivr.net",
                    "https://cdnjs.cloudflare.com"
                ],

                fontSrc: [
                    "'self'",
                    "https://cdnjs.cloudflare.com",
                    "https://use.fontawesome.com",
                    "data:"
                ],

                imgSrc: [
                    "'self'",
                    "data:",
                    "blob:",
                    "https:"
                ],

                connectSrc: [
                    "'self'",
                    "https://cdn.jsdelivr.net"
                ]
            }
        }
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/api/v1', limiter, userRoutes);
app.use("/", limiter, enquiryRoutes);


app.get(["/", "/index.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
})

app.get(["/login", "/login.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
})

app.get(["/register", "/register.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
})

app.use((req, res) => {
    res.status(404).send("HTTP ERROR 404 - Page Not Found");
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

module.exports = app;
