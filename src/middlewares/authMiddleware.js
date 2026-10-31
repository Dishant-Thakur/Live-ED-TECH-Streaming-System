const isAuthenticated = (req, res, next) => {
    if (!req.session?.user) {
        return res.status(401).json({
            status: false,
            message: "Please login first."
        });
    }
    next();
};

const allowRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.session?.user) {
            return res.status(401).json({
                status: false,
                message: "Please login first."
            });
        }

        if (!roles.includes(req.session.user.role)) {
            return res.status(403).json({
                status: false,
                message: "You are not authorized to access this resource."
            });
        }

        next();
    };
};

module.exports = {
    isAuthenticated,
    allowRoles
};