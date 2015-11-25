var mysql = require('mysql');



var Q = require('q');
module.exports = {
    get : function(config, callBack) {
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'bingo',
                password: 'bingo123456',
                database: 'bingo'
            });
            var userID = config.userID,
                is_get_one = config.is_get_one;

            if (!Array.isArray(userID))
                userID = [userID];

            userStr = userID.join(',');


            var resultAry = [],
                result,
                query;
            connection.connect();
            var query = Q.nbind(connection.query, connection);

            var promise = query('SELECT * FROM user WHERE FIND_IN_SET(id, ?)', [userStr]);
            promise.then(function(data) {
                connection.end();
                callBack(data[0][0]);
            }, function(err){
            });
    },

    create: function(config, callBack) {
        var connection = mysql.createConnection({
                host: 'localhost',
                user: 'bingo',
                password: 'bingo123456',
                database: 'bingo'
            });
        connection.connect();

        var query = Q.nbind(connection.query, connection);
        var promise = query('SELECT COUNT(*) as CNT FROM user WHERE account=?', [config.account]);


        var param = {
            account: config.account,
            password: config.password,
            name: config.name,
            money: 100,
            createTime: Date.now(),
        };

        promise.then(function(data){
console.log(data);
            return data[0][0].CNT;
        }).then(function(data2){

            if (data2==1) {
                //connection.end();
console.log(data2+8);
                callBack({status:true, msg:'have one'});
                connection.end();
            }
            else {
console.log(param);
                connection.query('INSERT INTO user SET ?', param, function(error, res){
                    if(error){
                        console.log('寫入資料失敗！');
                        throw error;
                    }
                    connection.end();
                    callBack({status:true, msg:res.insertId});
                });
            }
        });
        // connection.query('INSERT INTO user SET ?', data, function(error, res){
        //     if(error){
        //         console.log('寫入資料失敗！');
        //         throw error;
        //     }
        //     connection.end();
        //     callBack(error, res.insertId);
        // });
    }


};