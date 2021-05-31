import express from 'express';
const router = express.Router();
const AuthController = require('../../app/Controllers/Auth/AuthController');
//const authenticateToken = require('../../middlewares/authenticateToken');

import isLoggedOut from '../../middlewares/isLoggedOut';

router.get('/login', isLoggedOut, AuthController.showLoginForm);
//router.post('/login', isLoggedOut, AuthController.handleLogin, AuthController.rememberMe);
router.post('/login', isLoggedOut, AuthController.login);
router.get('/register', isLoggedOut, AuthController.showRegisterForm);
router.post('/register', isLoggedOut, AuthController.register);
router.get('/logout', AuthController.logout);
router.get('/forget-password', AuthController.showForgetPassword);
router.post('/forget-password', AuthController.forgetPassword);
router.get('/reset-password', AuthController.showResetPassword);
router.post('/reset-password', AuthController.resetPassword);

module.exports = router;



