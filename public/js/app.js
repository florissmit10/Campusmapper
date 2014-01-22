'use strict';

$(document).ready(function() {
	if($('div#map')!==undefined){
			var map = L.map('map', {
			center: [52.24406788078239, 6.855125427246093], 
			zoom: 15,
		});

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		var geojson;

		if(dataurl){
			$.ajax({
				url: dataurl,
			 	dataType: 'json' 
			 }).done(function(data){
				geojson=L.geoJson(data,{
					style: 			getStyle,
					onEachFeature: 	onEachFeature
				}).addTo(map);
			});
		} else{
			console.log('no data found');
		}
	}


	function onFeatureClick(event) {
		var link = event.target.feature.properties.link
		if(link!==undefined) location.href=link;
	}
	function onFeatureMouseOver(event){
		if(event.target!==undefined) event.target.openPopup();
		
		event.target.setStyle({
			weight: 5,
			color: '#666',
			fillOpacity: 0.7
		});
	}
	function onFeatureMouseOut(event){
		if(event.target!==undefined) event.target.closePopup();	
		
		geojson.resetStyle(event.target);
	}


	function getStyle(feature){
		return {
			fillColor: feature.properties.fillColor || '#FFEDA0',
			fillOpacity: 0.5,
			weight: 2,
        	opacity: 1,
        	color: 'white'
		}
	}

	function onEachFeature(feature, layer){
		var props 	= feature.properties,
		title 		= props.name || 'Title',
		content 	= props.content || '';

		layer.on({
					click: onFeatureClick,
					mouseover: onFeatureMouseOver,
					mouseout: onFeatureMouseOut
				});

		layer.bindPopup(content,{
			closeButton: false,
			closeOnClick: true,
			offset: L.point(6, 0)
		});

		
	}
});

