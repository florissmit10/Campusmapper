
var dburl = "mongodb://localhost:27017/campusmapper";

function errCallback (err, db)
{
	if (err) throw err;
}

function importFile (file, collection)
{
	// Read json file
	var obj = JSON.parse(fs.readFileSync(file));
	
	// Check
	if (obj.type != "FeatureCollection") throw "Not a feature collection";
	if (obj.crs.properties.name != "urn:ogc:def:crs:OGC:1.3:CRS84") throw "Unexpected crs name";
	
	// Iterate over features
	for (var i=0; i<obj.features.length; i++)
	{
		var f = obj.features[i];
		if (f.type != "Feature") throw "Not a feature";

		var fp = f.properties;
		if (fp.name != null) {
			// Keywords
			var keywords = [fp.name];
			if (fp.number != null) keywords.push('' + fp.number);
			if (fp.keywords != null) keywords.push.apply(keywords, fp.keywords.split(','));
			if (fp.abbr != null) keywords.push(fp.abbr);
			keywords = keywords.map(function (s) {return s.toLowerCase();});

			// New feature
			var prop = {name: fp.name, keywords: keywords};
			var feature = {type: "Feature", properties: prop, geometry: f.geometry};
			
			// Insert
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
	importFile('bag.geojson', collection);
	importFile('osm.geojson', collection);
	
	// Close pas als alle inserts gedaan zijn!
	//db.close();
});
