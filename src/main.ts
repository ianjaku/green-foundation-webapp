import { map, tileLayer } from "leaflet";

var someMap = map('map').setView([51.505, -0.09], 13);
tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 6,
  minZoom: 3,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(someMap);
