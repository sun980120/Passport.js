
const GoogleStrategy = require('passport-google-oauth2').Strategy
const passport = require('passport')
const authDAO = require('../models/authDAO')
require('dotenv').config({ path: ".env" });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

module.exports = () => {
    passport.use('google-login', new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/callback",
        // passReqToCallback: true,
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {
            const user = await authDAO.passportCheckGoogle(profile)
            if (user == 0) {
                const insertUser = await authDAO.insertGoogleUser(profile)
                const newuser = await authDAO.passportCheckGoogle(profile)
                return done(null, newuser)
            }
            return done(null, user);
        } catch (error) {
            return done(null, false, { message : error})
        }
    }))
}