var express = require('express');
var router = express.Router();

var uploadController = require('../controllers/uploadControllers')


router.get('/', function(req, res, next){
    res.render('upload', {file:null, files:req.files})
})

module.exports = router;
