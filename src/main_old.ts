import * as L from "leaflet";
import '@bopen/leaflet-area-selection/dist/index.css';
import { DrawAreaSelection } from '@bopen/leaflet-area-selection';
// import * as leafletDraw from "leaflet-draw";
var leafletDraw = require('leaflet-draw');

// import t from "countries.geojson";
// import countriesData from "./countries.json";

// const countriesData = await

// const run = async () => {
//   const countriesData = await fetch("https://github.com/datasets/geo-countries/blob/master/data/countries.geojson");

//   console.log("Data:", countriesData);
// }
// run();

var map = L.map('map', { zoomControl: false } as any).setView([51.505, -0.09], 13);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new (L as any).Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

const areaSelection = new DrawAreaSelection();
map.addControl(areaSelection);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 6,
  minZoom: 3,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var marker = L.marker([51.5, -0.30]).addTo(map);

var circle = L.circle([50.110924, 8.682127], {
  color: 'transparent',
  fillColor: 'red',
  fillOpacity: 0.7,
  radius: 30500,
  attribution: "test"
}).addTo(map);

// circle.addInteractiveTarget()

// circle.bindTooltip("Frankfurt");

const nr1 = L.marker([50.110924, 8.682127], {
  icon: L.divIcon({
    className: "text-labels",
    html: "1"
  }),
  zIndexOffset: 1000
}).addTo(map)


var circle2 = L.circle([48.8566, 2.3522], {
  color: 'transparent',
  fillColor: 'green',
  fillOpacity: 0.7,
  radius: 30500,
  attribution: "test"
}).addTo(map);

const nr3 = L.marker([48.8566, 2.3522], {
  icon: L.divIcon({
    className: "text-labels",
    html: "3"
  }),
  zIndexOffset: 1000
}).addTo(map)

// circle2.bindTooltip("Paris");


map.addEventListener("zoom", (e) => {
  console.log(map.getZoom())
  if (map.getZoom() < 6) {
    nr3.getElement().style.display = "none";
    nr1.getElement().style.display = "none";
  } else {
    nr3.getElement().style.display = "flex";
    nr1.getElement().style.display = "flex";
  }
});


const el = document.getElementById("title");
const dataCenter = document.getElementById("data-center");

circle.addEventListener("click", () => {
  dataCenter.style.display = "block";
  console.log("Huh?")
  el.innerHTML = "Frankfurt";
  circle.setStyle({
    color: "blue"
  })
  circle.redraw();
  circle2.setStyle({
    color: "transparent"
  })
  circle2.redraw();
})
nr1.addEventListener("click", () => {
  dataCenter.style.display = "block";
  el.innerHTML = "Frankfurt";
  circle.setStyle({
    color: "blue"
  })
  circle.redraw();
  circle2.setStyle({
    color: "transparent"
  })
  circle2.redraw();
})
circle2.addEventListener("click", () => {
  dataCenter.style.display = "block";
  el.innerHTML = "Paris";
  circle2.setStyle({
    color: "blue"
  })
  circle2.redraw();
  circle.setStyle({
    color: "transparent"
  })
  circle.redraw();
})
nr3.addEventListener("click", () => {
  dataCenter.style.display = "block";
  el.innerHTML = "Paris";
  circle2.setStyle({
    color: "blue"
  })
  circle2.redraw();
  circle.setStyle({
    color: "transparent"
  })
  circle.redraw();
})