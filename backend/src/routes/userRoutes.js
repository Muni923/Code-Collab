const express = require('express');
const Router = express.Router();
const { signup, signin, logout } = require('../controllers/user-controller');
const auth = require('../middlewares/auth')
Router.post('/signup', signup);
Router.post('/signin', signin);
Router.get('/logout', logout);
Router.get("/auth", auth);


module.exports = Router
