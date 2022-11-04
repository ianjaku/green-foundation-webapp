import { getRatingForStack, getStackDetails, getStacks } from "../components/gms_client";
import { addCircle, createLeafletMap, setCircleBorder } from "../components/leaflet_map";
import dataCenters from "../data/data_centers.json";
import mitt from "mitt";
import { hideDataCenterInfoBox, showDataCenterInfoBox } from "../components/data_center_info_box";
import { getDistanceBetweenTwoCoords } from "../helpers/geo";
import { getRelativeEfficiency } from "../helpers/carbon";
import { getActiveRegionsFromStacks, getAllStacksForRegion } from "../helpers/gms";

const RELATIVE_CARBON_RANGE_DEGREES = 20;

const stacks = getStacks();
const activeRegions = getActiveRegionsFromStacks(stacks);
const map = createLeafletMap("map");
const selectionEmitter = mitt();
let dataCenterSpecificMapItems = [];

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
  const color = `rgba(${255 * (1 - efficiency)}, ${255 * efficiency}, 0)`;

  const circle = addCircle(
    map,
    dataCenter.coords,
    color,
    () => {
      dataCenterSpecificMapItems.forEach(item => item.removeFrom(map));
      dataCenterSpecificMapItems = [];
      selectionEmitter.emit("select", region)
    },
    region
  );

  const showComparisonBox = () => {
    showDataCenterInfoBox(
      "#comparison",
      "Comparison",
      nearbyDataCenters.map(dc => {
        console.log("rating:", rating)
        if (dc.code === dataCenter.code) return null;
        const dcRating = getRatingForStack(dc.code);
        const relativeRating = Math.abs(Math.round(((rating - dcRating) / rating) * 100));
        return {
          label: dc.name,
          value: `${Math.round(dcRating)}kg/kwh`,
          good: dcRating <= rating ? `-${relativeRating}%` : undefined,
          bad: dcRating > rating ? `+${relativeRating}%` : undefined,
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
          value: `${Math.round(rating)}kg/kwh`
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

  const showComparisonLines = () => {
    nearbyDataCenters.forEach((dc) => {
      const line = L.polygon([
        dc.coords,
        dataCenter.coords,
      ], {
        opacity: 0.3,
        color: "blue",
        fill: false,
        weight: 2
      }).addTo(map);
      line.bindTooltip(dc.name);
      dataCenterSpecificMapItems.push(line)
    });
  }

  const showComparisonDistanceCircle = () => {
    const circle = L.circle(dataCenter.coords, {
      color: "blue",
      opacity: 0.1,
      fill: false,
      radius: 111 * 1000 * (RELATIVE_CARBON_RANGE_DEGREES - 5)
    }).addTo(map);
    dataCenterSpecificMapItems.push(circle);
  }

  selectionEmitter.on("select", (selectedRegion) => {
    if (region === selectedRegion) {
      setCircleBorder(circle, "blue");
      showDataCenterInfo();
      showStacksInfo();
      showComparisonLines();
      showComparisonDistanceCircle();
      showComparisonBox();
    } else {
      setCircleBorder(circle, "none");
    }
  });
});
