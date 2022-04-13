const passport = require('passport')
const LocalStrategy = require('passport-local')
const authDAO = require('../models/authDAO')
const bkfd = require('../middlewares/bkfd2')
// test
module.exports = () => {
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password ,done) => {
        try {
            const user = await authDAO.passportCheckUserLogin(email)
            const result = await bkfd.복호화(password, user.salt, user.user_pw);
            const user_data = {
                "displayName" : user.displayName,
                "user_id" : user.user_id,
                "level":user.level,
                "salt":user.salt
            }
            console.log(user_data);
            return done(null, user_data)
        } catch (error) {
            return done(null, false, { message: error })
        }
    }))
}