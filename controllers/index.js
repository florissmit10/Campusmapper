'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model={};
        res.render('index', model);
        
    });

};
