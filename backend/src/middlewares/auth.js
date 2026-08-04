const { verifyToken } = require('../utils/jwt');
const auth = async (req, res, next) => {
    try {
        const token = req?.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Cookie not found"
            });
        }

        const user = await verifyToken(token);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid User"
            });

        }
        req.user = user;
        next();
        // return res.json(req.user)

    }
    catch (err) {
        console.log('User Unauthorised');
        return res.status(404).json({
            success: false,
            message: err.message
        })

    }

}
module.exports = auth;