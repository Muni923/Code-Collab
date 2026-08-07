const express = require('express');
const Router = express.Router();
const { createRoom, joinRoom } = require('../controllers/room-controller');
const auth = require('../middlewares/auth');

Router.post('/create', auth, createRoom);
Router.post('/join', auth, joinRoom);

module.exports = Router
