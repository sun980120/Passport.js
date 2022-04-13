var express = require('express');
var router = express.Router();

var indexController = require('../controllers/indexControllers')


router.get('/', indexController.indexRoot);

module.exports = router;
