'use strict'

const passport = require('passport');
const jwtmiddle = require('../middlewares/jwt')
const bkfd = require('../middlewares/bkfd2')
const MiddleCrypto = require('../middlewares/crypto')

async function logout(req, res, next) {
    req.logout();
    delete req.session.flash;
    delete req.session.passport;
    res.redirect('/')
}

async function login(req, res, next) {
    await passport.authenticate('local-login',
        async (err, user, info) => {
            console.log(user)
            if (err) { return next(err) }
            if (user) {
                const token = await jwtmiddle.jwtCreate(user)
                req.session.salt = user.salt

                const token_encryption = await MiddleCrypto.cipher(token,req.session.salt)
                console.log(token_encryption)

                const decode = await MiddleCrypto.decipher(token_encryption, req.session.salt)
                console.log(decode)
                
                console.log(req.session)
                res.json({ "isAuth": true, "Message": "success", "token": token_encryption })
            } else {
                res.json({ "Message": "fail" })
            }
        }
    )(req, res, next);
}

async function registerUser(req, res, next) {
    await passport.authenticate('local-signup',
        async (err, user, info) => {
            if (err) { return next(err) }
            if (user) {
                res.json({ "isAuth": false, "Message": "success" })
            } else {
                res.json({ "Message": "fail" })
            }
        })(req, res, next)
}

async function updateUser(req, res, next) {

}

async function deleteUser(req, res, next) {

}
async function googleLogin(req, res, next) {
    passport.authenticate('google-login', { scope: ["email", "profile"] },
        async (err, user, info) => {
            if (err) { return next(err); }
            if (user) {
                const token = await jwtmiddle.jwtCreate(user)
                return res.json({ "isAuth": true, "Message": "success", "token": token })
            }
            else {
                res.json({ "Message": "fail", "isAuth": false })
            }
        })(req, res, next)
}

module.exports = {
    logout,
    login,
    registerUser,
    updateUser,
    deleteUser,
    googleLogin,
}