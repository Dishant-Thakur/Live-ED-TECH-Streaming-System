const express = require("express");
const path = require("path");
require("dotenv").config();

const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.post("/",(req,res)=>{
    const {name, number, email, course, timing, mode, qualification, status, extraData} = req.body;
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