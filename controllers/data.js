'use strict';
var fs = require('fs');

module.exports = function (server) {

    server.get('/data/welkom/', function (req, res) {
        var data = fs.readFileSync(__dirname+'/../data/welkom.geojson');
        res.send(JSON.parse(data));
        
    });

};
