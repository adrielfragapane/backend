const express = require('express');
const routerAuth = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const authController = require('../controllers/auth.controller');



routerAuth.post('/auth/facebook/token', passport.authenticate('facebook-token'),authController.facebookOAuth);

routerAuth.get('/*', authController.checkToken);

module.exports = routerAuth;