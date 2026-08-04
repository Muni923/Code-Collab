const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config')
const genToken = async (user) => {
    const myuser = {
        _id: user._id,
        username: user.username,
        email: user.email
    }
    const token = await jwt.sign(myuser, jwt_secret, { expiresIn: 30000 * 60 });

    return token;

}

const verifyToken = async (token) => {

    const isvalid = await jwt.verify(token, jwt_secret);

    return isvalid;

}

module.exports = { genToken, verifyToken };