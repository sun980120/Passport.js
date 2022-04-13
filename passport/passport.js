const passport = require('passport')
const db = require('../config/db')
const localLogin = require('./local-login')
const localSignup = require('./local-signup')
const googleLogin = require('./google-login')

module.exports = () => {
    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (id, done) {
        done(null, id)
    })
    localLogin();
    localSignup();
    googleLogin();
}