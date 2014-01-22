'use strict';

var dburl = "mongodb://localhost:27017/campusmapper";

var fs = require('fs');

module.exports = function (server) {

    server.get('/get', function (req, res) {
    
    	var type = require('url').parse(req.url, true).query.type;
    	
    	var MongoClient = require('mongodb').MongoClient;
    	MongoClient.connect(dburl, function (err, db) {
    		if (err) throw err;
    		db.collection("features").find({'properties.type': type}).toArray(function (err, results) {
	    		db.close();
    			if (err) throw err;
    			res.send({'type': 'FeatureCollection', 'features': results});
    		});
    	});
    });
    
    server.get('/search', function (req, res) {
    
    	var q = require('url').parse(req.url, true).query.q;
    	
    	var MongoClient = require('mongodb').MongoClient;
    	MongoClient.connect(dburl, function (err, db) {
    		if (err) throw err;
    		db.collection("features").find({'properties.keywords': q}).toArray(function (err, results) {
	    		db.close();
    			if (err) throw err;
    			res.send({'type': 'FeatureCollection', 'features': results});
    		});
    	});
    });

};
