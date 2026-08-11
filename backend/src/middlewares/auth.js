const { verifyToken } = require("../utils/jwt");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Cookie not found",
            });
        }

        const user = await verifyToken(token);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid User",
            });
        }

        req.user = user;

        next();
    } catch (err) {
        console.log("Auth error:", err.message);

        return res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = auth;