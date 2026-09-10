const authorizeMiddleware = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect("/login.html");
    }

    const { role } = req.session.user;

    if (role === "user") {
        return res.redirect("/userDashboard.html");
    }

    if (role === "faculty") {
        return res.redirect("/facultyDashboard.html");
    }

    if (role === "admin") {
        return res.redirect("/adminDashboard.html");
    }

    return res.status(403).send("Permission denied. You have not access for this page");
}

module.exports = authorizeMiddleware;