const express = require('express');
const Router = express.Router();
const { createRoom, joinRoom, leaveRoom, getAllmembers } = require('../controllers/room-controller');
const auth = require('../middlewares/auth');

Router.post('/create', auth, createRoom);
Router.post('/join', auth, joinRoom);
Router.post('/get', auth, getAllmembers);
Router.post('/leave', auth, leaveRoom);
Router.get('/:roomid', auth, getAllmembers);

module.exports = Router
