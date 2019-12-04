'use strict';

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

passport.use(new Strategy(
    async (username, password, done) => {
        const params = [username];
        try {
            const [user] = await userModel.getUser(params); //Or what function searches the user from database
            if (user === undefined) { // user not found
                return done(null, false);
            }
            if (!bcrypt.compareSync(password, user.password)) { //Check the password with bcrypt
                return done(null, false);
            }
            delete user.password; // remove password propety from user object
            return done(null, {...user});
        } catch (err) {
            return done(err);
        }
    }));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'Secret_Token'
    },
    (jwtPayload, done) => {
          done(null, jwtPayload);
    }
));

module.exports = passport;