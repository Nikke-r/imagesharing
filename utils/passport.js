'use strict';

//Do npm install passport passport-local bcryptjs
//Create seperate file passport.js

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});



passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new Strategy(
    async (username, password, done) => {
        const params = [username];
        try {
            const [user] = await userModel.getUser(params); //Or what function searches the user from database
            if (user === undefined) { // user not found
                return done(null, false);
            }
            if (!bcrypt.compareSync(password, user.password) { //Check the password with bcrypt
                return done(null, false);
            }
            delete user.password; // remove password propety from user object
            return done(null, {...user});
        } catch (err) {
            return done(err);
        }
    }));

module.exports = passport;