'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model={dataurl: '/get?type=welkom'};
        res.render('index', model);
        
    });

    server.get('/studie', function (req, res) {
         var model={dataurl: '/get?type=studie'};
        res.render('index', model);
        
    });

    server.get('/wonen', function (req, res) {
        var model={dataurl: '/get?type=wonen'};
        res.render('index', model);
        
    });

    server.get('/activisme', function (req, res) {
         var model={dataurl: '/get?type=activisme'};
        res.render('index', model);
        
    });

};
