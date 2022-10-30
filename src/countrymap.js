import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world.js'

export const createCountryMap = (
  selector = "#map"
) => {
  const map = new jsVectorMap({
    map: 'world',
    selector,
    regionsSelectable: true,
  });
  map.extend("addRegions", (regions) => {
    const selected = new Set([...map._getSelected("regions"), ...regions]);
    map._setSelected("regions", Array.from(selected));
  });
  map.extend("removeRegions", (regions) => {
    const currentlySelected = map._getSelected("regions");
    map.clearSelectedRegions();
    map._setSelected(
      "regions",
      currentlySelected.filter(code => !regions.includes(code))
    );
  });
  map.extend("setRegions", (regions) => {
    map._setSelected("regions", regions);
  });

  return map;
}
