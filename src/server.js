const express = require('express');
const PORT = process.env.PORT || 3000;
require("dotenv").config();

const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.redirect('/register');
})

app.get("/home", isAuthenticated, (req, res) => {
    res.send(`
        <h1>Welcome ${req.session.user.email}</h1>
        <a href="/read">Read Users</a><br><br>
        <a href="/logout">Logout</a>
    `);
});

app.get("/register", (req, res) => {
  res.send(`
<form action="/register" method="POST">
<input type="email" name="email" placeholder="Enter Email" required> <br><br>
<input type="password" name="password" placeholder="Enter Password" required> <br><br>
<input type="password" name="confirmPassword" placeholder="Confirm Password" required> <br><br>
<button type="submit"> Register</button>
</form>`
)
});


app.listen(PORT,(req,res)=>{
    console.log(`Server is running on http://localhost${PORT}`);
})
