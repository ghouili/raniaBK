const express = require('express');
const UserController = require('../controller/user');


const route = express.Router();

route.get('/logout', UserController.Logout);
route.post('/login', UserController.Login);

module.exports = route