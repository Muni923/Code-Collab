const { mongo } = require('mongoose');

const dotenv = require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    jwt_secret: process.env.jwt_secret,
    mongoURL:process.env.mongoURL
}