const mongoose = require('mongoose');
const { User } = require('../models/user-model');
const bcrypt = require('bcrypt');
const { genToken } = require('../utils/jwt')

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Input all credentials"
            })
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        const token = await genToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully"
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "error at user signup"
        })
    }
}
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Input all credentials"
            });
        }
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User does not exists"
            });
        }

        const hashedPassword = await existingUser.password;

        const correctPassword = await bcrypt.compare(password, hashedPassword);
        if (!correctPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = await genToken(existingUser);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return res.status(201).json({
            success: true,
            message: "Login successful"
        });

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "error at user signin"
        })
    }
}
const logout = (req, res) => {
    res.clearCookie("token");

    return res.status(201).json({
        success: true,
        message: "Logged out successfully"
    });
};
module.exports = { signup, signin, logout };