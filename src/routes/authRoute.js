const express = require("express");
const rateLimiter = require("express-rate-limit");

const router = express.Router();

const { validateUserLogin } =
    require("../middlewares/validateUserMiddleware");

const authController =
    require("../controllers/authController.js");

const authorizeMiddleware =
    require("../middlewares/authorizeMiddleware.js");

const loginLimiter = rateLimiter({
    windowMs: 3 * 60 * 1000,
    limit: 100,
    statusCode: 429,
    message: {
        status: false,
        message: "Too many login attempts. Please try again after 3 minutes."
    }
});

router.post(
    "/auth/login",
    loginLimiter,
    validateUserLogin,
    authController
);

router.get(
    "/auth/me",
    authorizeMiddleware,
    (req, res) => {
        return res.status(200).json({
            status: true,
            user: req.session.user
        });
    }
);
module.exports = router;