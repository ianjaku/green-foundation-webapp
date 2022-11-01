import { getRatingForStack, getStackDetails, getStacks } from "../components/gms_client";
import { addCircle, createLeafletMap, setCircleBorder } from "../components/leaflet_map";
import dataCenters from "../data/data_centers.json";
import mitt from "mitt";
import { hideDataCenterInfoBox, showDataCenterInfoBox } from "../components/data_center_info_box";
import { getDistanceBetweenTwoCoords } from "../helpers/geo";
import { getRelativeEfficiency } from "../helpers/carbon";

const RELATIVE_CARBON_RANGE_DEGREES = 25;

const stacks = getStacks();
const map = createLeafletMap("map");
const selectionEmitter = mitt();


stacks.forEach(stack => {
  const details = getStackDetails(stack.id);
  const dataCenter = dataCenters.find(dataCenter => dataCenter.code === stack.region);
  if (dataCenter == null) {
    console.log("Can't find code:", stack.region)
    return;
  }

  const nearbyDataCenters = dataCenters.filter(dc => {
    return getDistanceBetweenTwoCoords(dataCenter.coords, dc.coords) < RELATIVE_CARBON_RANGE_DEGREES;
  });
  const efficiency = getRelativeEfficiency(stack.region, nearbyDataCenters);
  const rating = getRatingForStack(stack.region);

  const circle = addCircle(
    map,
    dataCenter.coords,
    `rgba(${255 * (1 - efficiency)}, ${255 * efficiency}, 0)`,
    () => selectionEmitter.emit("select", stack.region),
    stack.region
  );

  const showComparisonBox = () => {
    showDataCenterInfoBox(
      "#comparison",
      "Comparison",
      nearbyDataCenters.map(dc => {
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
        { label: "Region", value: stack.region },
        {
          label: "Carbon efficiency",
          value: `${Math.round(rating)}kg/h (${Math.round(efficiency * 100)}%)`,
          // Don't need an onClick when it's already the most efficient
          onClick: efficiency === 1 ? undefined : () => showComparisonBox()
        },
        { label: "Size", value: `${details.resources.length} resources` }
      ]
    );
  }

  selectionEmitter.on("select", (region) => {
    hideDataCenterInfoBox("#comparison");
    if (region === stack.region) {
      setCircleBorder(circle, "blue");
      showDataCenterInfo();
    } else {
      setCircleBorder(circle, "none");
    }
  });
});
