const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');

const userSchema = Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true,

    }
}, { timestamps: true })

const User = model('User', userSchema);

module.exports = {
    User
}