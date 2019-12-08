'use strict';
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const authController = require('../controllers/authController');
const multer = require('multer');
const passport = require('passport');

router.post('/login', authController.login);
router.get('/logout' , authController.logout);
router.post('/register',
    [
    body('username', 'minimum 3 characters').isLength({min: 3}),
    body('email', 'email is not valid').isEmail(),
    body('password', 'at least one upper case letter').matches('(?=.*[A-Z]).{8,}'),
    sanitizeBody('name').escape(),
    ], authController.register);

module.exports = router;