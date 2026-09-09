const authorizeMiddleware = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect("/login.html");
    }

    const { role } = req.session.user;

    if (role === "user") {
        return res.redirect("/index.html");
    }

    if (role === "educator") {
        return res.redirect("/educator.html");
    }

    if (role === "admin") {
        return res.redirect("/admin.html");
    }

    return res.status(403).send("Permission denied. You have not access to this page");
}

module.exports = authorizeMiddleware;