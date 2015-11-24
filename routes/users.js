var express = require('express');
var router = express.Router();
var Q = require('q');
var userLib = require('../lib/userLib');
userLib.get({
    userID:1,
    is_get_one:true
}, function(data){
console.log(data);
console.log(data[0].id);
    // var rdata = {};
    // rdata.id=data[0].id;
console.log(rdata)
});

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
