'use strict';

$(document).ready(function() {
	if($('div#map')!==undefined){
			var map = L.map('map', {
			center: mapCenter, 
			zoom: mapZoom,
		});

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML = (props&&props.content ? props.content: '');
		};

		info.addTo(map);

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
		if(link!==undefined) {
			var mode = link[0]==='h'?'_blank':'_self';
			window.open(link,mode);
		}
	}
	function onFeatureMouseOver(event){
		if(event.target!==undefined) info.update(event.target.feature.properties);

		if(event.target.feature.geometry.type=="Polygon")
			event.target.setStyle({
			weight: 5,
			color: '#666',
			fillOpacity: 0.7
		});
	}
	function onFeatureMouseOut(event){
		info.update();
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
		if(props.icon!==undefined){
			layer.setIcon(L.icon(props.icon));
		}
	}
});

