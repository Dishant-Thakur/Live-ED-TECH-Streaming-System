const authorizeMiddleware = (req, res, next) => {

    if (!req.session.user) {
        return res.status(401).json({
            status: false,
            message: "Please login first."
        });
    }
    const { role } = req.session.user;
    if (!["user", "faculty", "admin"].includes(role)) {
        return res.status(403).json({
            status: false,
            message: "Permission denied. You have not permission to access this"
        });
    }
    return res.status(200).json({
        status: true,
        message: "Login successful",
        role: role
    });
};

module.exports = authorizeMiddleware;