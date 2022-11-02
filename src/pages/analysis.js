import { getRatingForStack, getStackDetails, getStacks } from "../components/gms_client";
import { addCircle, createLeafletMap, setCircleBorder } from "../components/leaflet_map";
import dataCenters from "../data/data_centers.json";
import mitt from "mitt";
import { hideDataCenterInfoBox, showDataCenterInfoBox } from "../components/data_center_info_box";
import { getDistanceBetweenTwoCoords } from "../helpers/geo";
import { getRelativeEfficiency } from "../helpers/carbon";
import { getActiveRegionsFromStacks, getAllStacksForRegion } from "../helpers/gms";

const RELATIVE_CARBON_RANGE_DEGREES = 25;

const stacks = getStacks();
const activeRegions = getActiveRegionsFromStacks(stacks);
const map = createLeafletMap("map");
const selectionEmitter = mitt();

activeRegions.forEach(region => {
  const dataCenter = dataCenters.find(dataCenter => dataCenter.code === region);
  if (dataCenter == null) {
    console.log("Can't find code:", region)
    return;
  }

  const nearbyDataCenters = dataCenters.filter(dc => {
    return getDistanceBetweenTwoCoords(dataCenter.coords, dc.coords) < RELATIVE_CARBON_RANGE_DEGREES;
  });
  const efficiency = getRelativeEfficiency(region, nearbyDataCenters);
  const rating = getRatingForStack(region);

  const circle = addCircle(
    map,
    dataCenter.coords,
    `rgba(${255 * (1 - efficiency)}, ${255 * efficiency}, 0)`,
    () => selectionEmitter.emit("select", region),
    region
  );

  const showComparisonBox = () => {
    console.log("Nearby:", nearbyDataCenters)
    showDataCenterInfoBox(
      "#comparison",
      "Comparison",
      nearbyDataCenters.map(dc => {
        console.log("rating:", rating)
        const dcRating = getRatingForStack(dc.code);
        if (dcRating > rating) return null;
        const relativeRating = Math.round(((rating - dcRating) / rating) * 100);
        return {
          label: dc.code,
          value: `${Math.round(dcRating)}kg/h`,
          improvement: `-${relativeRating}%`,
          sort: dcRating
        }
      }).filter(dc => dc != null)
        .sort((a, b) => a.sort - b.sort)
    );
  }

  const showDataCenterInfo = () => {
    showDataCenterInfoBox(
      "#data-center",
      dataCenter.name,
      [
        { label: "Region", value: region },
        {
          label: "Carbon rating",
          value: `${Math.round(rating)}kg/h`
          // value: `${Math.round(rating)}kg/h (${Math.round(efficiency * 100)}%)`,
        }
      ]
    );
  }

  const showStacksInfo = () => {
    const regionalStacks = getAllStacksForRegion(region)
      .map((stack) => (
        {
          label: stack.name.split('/')[1],
          value: `${getStackDetails(stack.id).resources.length} resources`
        }
      ));
    showDataCenterInfoBox(
      "#stack",
      "Stacks",
      regionalStacks
    );
  }

  selectionEmitter.on("select", (selectedRegion) => {
    if (region === selectedRegion) {
      setCircleBorder(circle, "blue");
      showDataCenterInfo();
      showStacksInfo();
      if (efficiency !== 1) {
        showComparisonBox();
      } else {
        hideDataCenterInfoBox("#comparison");
      }
    } else {
      setCircleBorder(circle, "none");
    }
  });
});
