'use strict';

$(document).ready(function() {
	if($('div#map')!==undefined){
		var map = L.map('map', {
			center: [52.2425437869612, 6.852636337280273], 
			zoom: 15,
		});

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		map.on('click',function(e) {
			console.log(e.latlng);
		});
	}
	});
