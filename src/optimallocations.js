
var map = L.map('map', { zoomControl: false }).setView([51.505, -0.09], 13);

L.control.zoom({
  position: 'bottomright'
}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 4,
  minZoom: 3,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var circle = L.circle([50.110924, 8.682127], {
  color: 'transparent',
  fillColor: 'green',
  fillOpacity: 0.7,
  radius: 100500,
  attribution: "test"
}).addTo(map);
circle.bindTooltip("Frankfurt");

circle.addEventListener("click", () => {
  console.log("Test")
});
