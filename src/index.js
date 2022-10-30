import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world.js'
import euCountries from "./data/eu.json";
import gdprCountries from "./data/gdpr.json";

    var markers = [{
        name: 'Russia',
        coords: [61, 105],
        style: {
          r: 10
        }
      },
      {
        name: 'Geenland',
        coords: [72, -42],
        style: {
          r: 11,
        }
      },
      {
        name: 'Canada',
        coords: [56, -106],
        style: {
          r: 15,
        }
      },
      {
        name: 'Palestine',
        coords: [31.5, 34.8],
        style: {
          r: 7,
        }
      },
      {
        name: 'Brazil',
        coords: [-14.2350, -51.9253],
      },
      {
        name: 'China',
        coords: [35.8617, 104.1954],
        style: {
          image: "../assets/images/pin.png"
        },
        offsets: [2, 2]
      },
    ];

    var map = new jsVectorMap({
      map: 'world',
      selector: '#map',

      regionsSelectable: true,
      markersSelectable: true,

      // -------- Events --------
      onRegionSelected: function (index, isSelected, selectedRegions) {
        console.log(index, isSelected, selectedRegions);
      },
      onMarkerSelected: function (code, isSelected, selectedMarkers) {
        console.log(code, isSelected, selectedMarkers)
      },
      onRegionTooltipShow: function (event, tooltip, code) {
        if (code === 'RU') {
          tooltip.getElement().innerHTML = tooltip.text() + ' <b>(Hello Russia)</b>'
        }
      },
      onMarkerTooltipShow: function (event, tooltip, index) {
        tooltip.getElement().innerHTML = '<h5 class="mb-0">'+tooltip.text()+'</h5>' + '<p class="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p><small class="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>'
      },

      // -------- Labels --------
      labels: {
        markers: {
          render: function(marker) {
            return marker.name;
          },
          offsets: function(index) {
            return markers[index].offsets || [0, 0]
          }
        },
        regions: {
          render: function(code) {
            var codes = ['EG', 'KZ', 'CN']

            if (codes.indexOf(code) > -1) {
              return ''
            }
          },
        }
      },

      // -------- Region and label style --------
      regionStyle: {
        selected: {
          fill: "#5c5cff"
        }
      },
      regionLabelStyle: {},

      // -------- Marker and label style --------
      markers: markers,
      markerStyle: {
        initial: {
          fill: '#ff5566'
        },
        hover: {
          stroke: "#676767",
          fillOpacity: 1,
          strokeWidth: 2.5,
          fill: '#ff5566'
        },
        selected: {
          fill: '#ff9251'
        }
      },
      markerLabelStyle: {
        initial: {
          fontFamily: 'Poppins',
          fontSize: 13,
          fontWeight: 500,
          fill: '#35373e',
        },
      },
    })

// const map = new jsVectorMap({
//   selector: '#map',
//   map: 'world',
//   regionsSelectable: true,
//   onRegionSelected(index, isSelected, selectedRegions) {
//     console.log(index, isSelected, selectedRegions)
//     // map.setSelectedRegions = ["GE"]
//     // if (!selectedRegions.includes("RU")) {
//     //   map._setSelected("regions", ["RU"])
//     // }
//   },
//   selectedRegions: ["CH", "BE", "FR"],
//   labels: {
//         markers: {
//           render: function(index) {
//             return markers[index].name;
//           },
//           offsets: function(index) {
//             return markers[index].offset || [0, 0]
//           }
//         },
//         regions: {
//           render: function(code) {
//             var codes = ['EG', 'KZ', 'CN']

//             if (codes.indexOf(code) > -1) {
//               return ''
//             }
//           },
//         }
//       },

// })
// map.extend("selectRegions", (region) => {
//   const selected = new Set(map._getSelected("regions"));
//   if (Array.isArray(region)) {
//     region.forEach(r => selected.add(r));
//   } else {
//     selected.add(region)
//   }
//   map._setSelected("regions", Array.from(selected));
// })
// map.extend("setRegions", (regions) => {
//   map._setSelected("regions", regions);
// })

// setTimeout(() => {
//   // map.setSelectedRegions("GE")
//   // map._setSelected("regions", ["RU"])
//   // map.selectRegion(["RU"])
//   // console.log("EUCOuntries:", euCountries)
//   map.selectRegions(gdprCountries.map(c => c.code.value))
// }, 1000)


console.log(Object.keys(map), map)
console.log("REgions:", map.getSelectedRegions())


// console.log("Hey:)")

// var map = L.map('map').setView([51.505, -0.09], 13);
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution: ''
// }).addTo(map);