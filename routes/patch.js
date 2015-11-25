var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var Q = require('q');
var connection = mysql.createConnection({
                host: 'localhost',
                user: 'bingo',
                password: 'bingo123456',
                database: 'bingo'
            });
        
/* GET users listing. */
router.get('/', function(req, res, next) {
    connection.connect();
    var query = Q.nbind(connection.query, connection);
    var promise = query('CREATE TABLE IF NOT EXISTS user (id int(11) NOT NULL,account varchar(255) NOT NULL,password varchar(255) NOT NULL,name varchar(50) NOT NULL,money int(11) NOT NULL,win int(11) NOT NULL,createTime datetime NOT NULL) ENGINE=MyISAM DEFAULT CHARSET=utf8;', []);
    promise.then((data)=>{
        connection.query("ALTER TABLE `user` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `account` (`account`);", function(err, res2, field){
              if (!err)
                  res.send('done');
          });
    });

});

module.exports = router;