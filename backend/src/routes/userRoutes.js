const express = require('express');
const Router = express.Router();
const { signup, signin, logout } = require('../controllers/user-controller');
Router.post('/signup', signup);
Router.post('/signin', signin);
Router.get('/logout', logout);


module.exports = Router
