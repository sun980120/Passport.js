const passport = require('passport')
const LocalStrategy = require('passport-local')
const authDAO = require('../models/authDAO')
const bkfd = require('../middlewares/bkfd2')

module.exports = () => {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, async(req, email, password, done)=>{
        try {
            let parameter = {
                "user_id" : email,
                "user_pw" : password,
                "displayName" : req.body.displayName,
            }
            const checkUser = await authDAO.checkUserID(parameter)
            const result = await bkfd.암호화(parameter)

            parameter.user_pw = result.hash;
            parameter.salt = result.salt;
            
            const insertuser = await authDAO.insertUser(parameter)
            console.log(insertuser)
            const user = await authDAO.passportCheckUserSignup(user_id)
            console.log(user)
            return done(null, user)

        } catch (error) {
            return done(null, false, { message: error })
        }
    }))
}