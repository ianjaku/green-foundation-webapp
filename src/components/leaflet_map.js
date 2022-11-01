
export const createLeafletMap = (htmlId) => {
  const map = L.map(htmlId, { zoomControl: false }).setView([51.505, -0.09], 13);

  L.control.zoom({
    position: 'bottomright'
  }).addTo(map);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 4,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    noWrap: true,
  }).addTo(map);

  return map;
}

export const addCircle = (
  genericMap,
  location, // [long, lat]
  color,
  onClick = null,
  tooltip = null,
) => {
  const circle = L.circle(location, {
    color: 'transparent',
    fillColor: color,
    fillOpacity: 0.7,
    radius: 100500,
  }).addTo(genericMap);

  if (tooltip != null) {
    circle.bindTooltip(tooltip);
  }

  if (onClick != null) {
    circle.addEventListener("click", (e) => {
      onClick(e);
    });
  }

  return circle;
}

export const setCircleBorder = (circle, color) => {
  circle.setStyle({ color });
}
