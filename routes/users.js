var express = require('express');
var router = express.Router();
var Q = require('q');
var userLib = require('../lib/userLib');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
    res.render('user_register', { title: '註冊' });
});

router.get('/login', function(req, res, next) {
    res.render('user_login', { title: '登入' });
});

router.get('/name/:account', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/ax_register', (req, res, next) => {
    userLib.create(req.body,(data) => {
console.log(data);
         res.send(data);
    });
});

module.exports = router;
