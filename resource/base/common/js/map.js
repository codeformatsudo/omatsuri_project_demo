(function () {
	"use strict";

	//mapSize
	function mapSize() {
		//  var w = $(window).width();
		var h = $(window).height();
		//  var mapWidth = w - 40;
		var mapHeight = h - 60 - $("header").outerHeight() - $("footer").outerHeight();
		/*
		$("#map").css({
		 "width": mapWidth + "px"
		});
		*/
		$("#map").css({
			"height": mapHeight + "px"
		});
	};
	mapSize();

	//mapSizeの読み込みなおし
	$(window).resize(mapSize);

	//zoomSize
	var zoomSize = '';
	var w = $(window).width();
	if (w <= 768) {
		zoomSize = 17;
	} else {
		zoomSize = 18;
	}

	//マップデータの読み込み
	csvToArray('data/map.csv', function (data) {
		var lat = parseFloat(data[1][0]);
		var lng = parseFloat(data[1][1]);

		//map,icon,tileLayerの設定
		var map = L.map('map').setView([lat, lng], zoomSize);

		var icon = L.icon({
			iconUrl: 'common/css/images/marker-icon.png',
			shadowUrl: 'common/css/images/marker-shadow.png',
			iconSize: [25, 42],
			shadowSize: [41, 41],
			iconAnchor: [22, 94],
			shadowAnchor: [20, 90]
		})
		L.marker([lat, lng], {
			icon: icon
		}).addTo(map);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
	});

	//CSVを配列にする
	function csvToArray(filename, cb) {
		$.get(filename, function (csvdata, status) {
			var ret = [];
			if (status == 'success') {
				csvdata = csvdata.replace(/\r/gm, "");
				var line = csvdata.split("\n");
				var i = 0;
				for (i in line) {
					//空行はスルーする。
					if (line[i].length === 0) {
						continue;
					}
					var row = line[i].split(",");
					ret.push(row);
				}
			}
			cb(ret);
		});
	}
}());
