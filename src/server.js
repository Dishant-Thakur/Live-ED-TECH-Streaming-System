const express = require("express");
const path = require("path");
require("dotenv").config();

const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({
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
                    "https://cdn.jsdelivr.net",
                    "https://cdnjs.cloudflare.com",
                    "data:"
                ],

                imgSrc: [
                    "'self'",
                    "data:",
                    "blob:"
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

app.get(["/","index.html"], (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.post("/",(req,res)=>{
    const {name, phone, email, course, timing, mode, qualification, status, goals} = req.body;
    if(!req.body){
        return res.send('Sorry no data');
    }
    console.log(req.body);
    res.send('Data send');
})

app.use((req, res) => {
    res.status(404).send("HTTP ERROR 404 - Page Not Found");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});