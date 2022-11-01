import { getRatingForStack, getStackDetails, getStacks } from "../components/gms_client";
import { addCircle, createLeafletMap, setCircleBorder } from "../components/leaflet_map";
import dataCenters from "../data/data_centers.json";
import mitt from "mitt";
import { showDataCenterInfoBox } from "../components/data_center_info_box";
import { getDistanceBetweenTwoCoords } from "../helpers/geo";
import { getRelativeEfficiency } from "../helpers/carbon";

const RELATIVE_CARBON_RANGE_DEGREES = 25;

const stacks = getStacks();
const map = createLeafletMap("map");
const selectionEmitter = mitt();

const getEfficiencyForDataCenter = (region) => {
  const dataCenter = dataCenters.find(dataCenter => dataCenter.code === region);

  const nearbyDataCenters = dataCenters.filter(dc => {
    return getDistanceBetweenTwoCoords(dataCenter.coords, dc.coords) < RELATIVE_CARBON_RANGE_DEGREES;
  });

  return getRelativeEfficiency(region, nearbyDataCenters);
}

const getColorForEfficiency = (efficiency) => {
  const red = 255 * (1 - efficiency);
  const green = 255 * efficiency;
  return `rgb(${red}, ${green}, 0)`;
}

stacks.forEach(stack => {
  const details = getStackDetails(stack.id);
  const dataCenter = dataCenters.find(dataCenter => dataCenter.code === stack.region);
  if (dataCenter == null) {
    console.log("Can't find code:", stack.region)
    return;
  }

  const efficiency = getEfficiencyForDataCenter(stack.region);
  
  console.log(efficiency)
  const circle = addCircle(
    map,
    dataCenter.coords,
    getColorForEfficiency(efficiency),
    () => selectionEmitter.emit("select", stack.region),
    stack.region
  );

  selectionEmitter.on("select", (region) => {
    if (region === stack.region) {
      setCircleBorder(circle, "blue");
      showDataCenterInfoBox(
        dataCenter.full_name,
        [
          { label: "Region", value: region },
          { label: "Carbon efficiency", value: Math.round(efficiency * 100) + "%" },
          { label: "Size", value: `${details.resources.length} resources` }
        ]
      );
    } else {
      setCircleBorder(circle, "none");
    }
  });
});
