'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model = { name: 'campusmapper' };
        
        res.render('index', model);
        
    });

};
