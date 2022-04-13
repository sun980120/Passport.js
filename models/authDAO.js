'use strict'

const db = require('../config/db');

function checkUserID(parameter) {
    return new Promise(function (resolve, reject) {
        let queryData = `SELECT * FROM user WHERE user_id=?`;
        db.query(queryData, [parameter.user_id], function (error, db_data) {
            if (error) {
                reject(error)
            }
            if (db_data[0] == undefined) resolve('유저정보없음')
            else reject('이미 유저정보가 있음')
        })
    })
}
function insertUser(parameter) {
    return new Promise(function (resolve, reject) {
        let queryData = `INSERT INTO user (user_id, user_pw, salt, displayName) VALUES (?,?,?,?)`;
        db.query(queryData, [parameter.user_id, parameter.user_pw, parameter.salt, parameter.displayName], function (error, db_data) {
            if (error) { reject(error) }
            if (db_data.affectedRows != 0) resolve('유저정보 입력완료')
            else reject('실패')
        })
    })
}
function passportCheckUserSignup(parameter) {
    return new Promise(function (resolve, reject) {
        let queryData = `SELECT user_id, displayName FROM user WHERE user_id=?`;
        db.query(queryData, [parameter], function (error, db_data) {
            console.log(db_data)
            if (error) { reject(error) }
            if(db_data[0] == undefined) reject('등록되지 않은 사용자')
            else resolve(db_data[0])
        })
    })
}
function passportCheckGoogle(parameter) {
    return new Promise(function (resolve, reject) {
        let queryData = `SELECT user_id, displayName,level FROM google WHERE user_id = ?`;
        db.query(queryData, [parameter.id], function (error, db_data){
            if(error) resolve(error)
            if(db_data[0] != undefined) resolve(db_data[0])
            else resolve(0)
        })
    })
}
function insertGoogleUser(parameter){
    return new Promise(function (resolve, reject) {
        let queryData = `INSERT INTO google (user_id, displayName, email, verified, email_verified, provider) VALUES (?,?,?,?,?,?)`;
        db.query(queryData, [parameter.id, parameter.displayName, parameter.email, parameter.verified, parameter.email_verified, parameter.provider], function (error, db_data){
            if (error) { reject(error) }
            if (db_data.affectedRows != 0) resolve('유저정보 입력완료')
            else reject('실패')
        })
    })
}
function passportCheckUserLogin(parameter){
    return new Promise(function (resolve, reject) {
        let queryData = `SELECT user_id,salt, user_pw,displayName, level FROM user WHERE user_id = ?`;
        db.query(queryData, [parameter], function (error, db_data) {
            if (error) { reject(error) }
            if(db_data[0] == undefined) reject('등록되지 않은 사용자')
            else resolve(db_data[0])
        })
    })
}
module.exports = {
    passportCheckGoogle,
    passportCheckUserSignup,
    checkUserID,
    insertUser,
    insertGoogleUser,
    passportCheckUserLogin,
}