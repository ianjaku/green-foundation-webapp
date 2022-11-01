import dataCenters from "../data/data_centers.json";
import mitt from "mitt";
import { createLeafletMap, addCircle, setCircleBorder } from "../components/leaflet_map";
import { showDataCenterInfoBox } from "../components/data_center_info_box";


const map = createLeafletMap('map');

// Get best and worst efficiency
const ratings = dataCenters.map(dataCenter => {
  const rating = Math.floor(Math.random() * 500) + 100;
  return {
    value: rating,
    code: dataCenter.code
  }
});

const bestRating = ratings.reduce((a, b) => a.value < b.value ? a : b);
const worstRating = ratings.reduce((a, b) => a.value > b.value ? a : b);

/**
 * @param {string} dataCenterCode 
 * @returns {number} from 0 to 1, 0 = worst, 1 = best efficiency (from all datacenters)
 */
const getDataCenterEfficiency = (dataCenterCode) => {
  const rating = ratings.find(rating => rating.code === dataCenterCode);
  return (rating.value - bestRating.value) / (worstRating.value - bestRating.value);
}


const selectionEmitter = mitt();


dataCenters.forEach(dataCenter => {
  const efficiency = getDataCenterEfficiency(dataCenter.code);
  const red = 255 * (1 - efficiency);
  const green = 255 * efficiency;

  const onClick = () => {
    selectionEmitter.emit("select", dataCenter.code);
  }
  const circle = addCircle(map, dataCenter.coords, `rgba(${red}, ${green}, 0)`, onClick, dataCenter.code);

  selectionEmitter.on("select", (code) => {
    if (code === dataCenter.code) {
      setCircleBorder(circle, "blue");
      showDataCenterInfoBox(
        ".data-center",
        dataCenter.name,
        [
          { label: "Region name", value: dataCenter.code },
          { label: "Carbon Efficiency", value: Math.round(efficiency * 100) + "%" },
          { label: "Services", value: "x services" }
        ]
      );
    } else {
      setCircleBorder(circle, "none");
    }
  });
});
