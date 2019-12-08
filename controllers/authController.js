'use strict';
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const userModel = require('../models/userModel');

const login = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, process.env.Secret_Token);
            return res.json({user, token});
        });
    })(req, res);
};

const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('user create error', errors);
        res.send(errors.array());
    } else {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const params = [
            req.body.username,
            req.body.email,
            hash,
        ];
        if (await userModel.addUser(params)) {
            params[2] = "";
            res.json(params);
            next();
        } else {
            res.status(400).json({error: 'register error'});
        }
    }
};

const logout = (req, res) => {
    req.logout();
    res.json({message: 'logout'});
};

module.exports = {
    login,
    register,
    logout,
};
