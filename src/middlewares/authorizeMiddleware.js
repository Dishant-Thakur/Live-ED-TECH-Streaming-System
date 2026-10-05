const authorizeMiddleware = (req, res, next) => {

    if (!req.session.user) {
    return res.status(401).json({
          status: false,
          message: "Session expired. Please login again."
});
    }

    const { role } = req.session.user;
    if (!["user", "faculty", "admin"].includes(role)) {
        return res.status(403).json({
            status: false,
            message: "Permission denied."
        });
    }
    next();
};

module.exports = authorizeMiddleware;