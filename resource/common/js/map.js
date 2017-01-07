(function () {
 "use strict";
 //mapSize
 function mapSize() {
  //  var w = $(window).width();
  var h = $(window).height();
  //  var mapWidth = w - 40;
  var mapHeight = h - 60 - $("header").outerHeight() - $("nav").outerHeight() - $("footer").outerHeight();
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
 $(window).resize(mapSize);

 //zoomSize
 var zoomSize = '';
 var w = $(window).width();
 if (w <= 768) {
  zoomSize = 15;
 } else {
  zoomSize = 16;
 }

 //マップデータの読み込み
 csvToArray('common/data/map.csv', function (data) {
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

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
 });
}());
