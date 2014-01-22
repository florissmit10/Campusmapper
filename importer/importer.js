'use strict';

var dburl = "mongodb://localhost:27017/campusmapper";

function errCallback (err, db)
{
	if (err) throw err;
}

function escapeHtml (string) {
	return string.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
}

function importFile (file, collection)
{
	// Read json file
	var obj = JSON.parse(fs.readFileSync(file));
	
	// Check
	if (obj.type != "FeatureCollection") throw "Not a feature collection";
	//if (obj.crs.properties.name != "urn:ogc:def:crs:OGC:1.3:CRS84") throw "Unexpected crs name";
	
	// Iterate over features
	for (var i=0; i<obj.features.length; i++)
	{
		var f = obj.features[i];
		if (f.type != "Feature") throw "Not a feature";

		var fp = f.properties;
		if (fp.name != null && fp.type != null) {
			// Keywords
			var keywords = [fp.name];
			if (fp.number != null) keywords.push('' + fp.number);
			if (fp.keywords != null) keywords.push.apply(keywords, fp.keywords.split(','));
			if (fp.abbr != null) keywords.push(fp.abbr);
			keywords = keywords.map(function (s) {return s.toLowerCase();});
			
			// Content
			var content;
			var contentPath = 'importer/content/' + fp.name.toLowerCase().replace('/', '-') + '.htm';
			if (fs.existsSync(contentPath)) {
				content = fs.readFileSync(contentPath, {encoding: 'utf-8'});
			}
			else {
				var s = '';
				if (fp.number != null) s += fp.number + '. ';
				s += fp.name;
				if (fp.abbr != null) s += ' (' + fp.abbr + ')';

				content = '<h4>' + escapeHtml(s) + '</h4>';
				
				// Write content
				fs.writeFile(contentPath, content, {encoding: 'utf-8'}, errCallback);
			}
			
			// Fill color
			var fillColor = fp.fillColor ? fp.fillColor : '#ffeda0';

			// New feature
			var prop = {name: fp.name, keywords: keywords, content: content, type: fp.type, fillColor: fillColor};
			var feature = {type: "Feature", properties: prop, geometry: f.geometry};
			
			// Insert
			console.log(feature.properties.name);
			collection.insert(feature, errCallback);
		}
	}
}

var fs = require('fs');

// Connect
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(dburl, function(err, db)
{
	if (err) throw err;

	var collection = db.collection("features");
	
	// Empty
	collection.remove(errCallback);
	
	// Insert
	importFile('importer/bag.geojson', collection);
	importFile('importer/osm.geojson', collection);
	importFile('importer/points.geojson', collection);
	importFile('importer/welkom.geojson', collection);
	
	// Close pas als alle inserts gedaan zijn!
	//db.close();
});
