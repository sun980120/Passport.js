var express = require('express');
var router = express.Router();
const passport = require('passport');
const authCtrls = require('../controllers/authCtrl')

const { isLoggedIn, isNotLoggedIn } = require('../middlewares/login-middlewares')

// API
//-------------------------------------GET-------------------------------------//

// 로그아웃
router.get('/logout', isLoggedIn, authCtrls.logout)

// 로그인 // 생략가능
router.get('/login', function (req, res, next) {
    res.render('login')
})

// 구글 로그인
router.get('/google', authCtrls.googleLogin )

//구글 로그인 완료
router.get('/google/callback', passport.authenticate('google-login', {
    successRedirect: '/',
    failureRedirect: '/api/auth/login',
    failureFlash: true
}))
//------------------------------------POST-------------------------------------//

// 로그인
router.post('/login' ,authCtrls.login)

// 회원가입
router.post('/register', isNotLoggedIn, authCtrls.registerUser)

//-------------------------------------PUT-------------------------------------//

// 회원정보 수정
router.put('/update', isLoggedIn, authCtrls.updateUser)             // 미완성

//------------------------------------DELETE-----------------------------------//

// 회원탈퇴
router.delete('/delete', isLoggedIn, authCtrls.deleteUser)          // 미완성

//-----------------------------------------------------------------------------//

module.exports = router;