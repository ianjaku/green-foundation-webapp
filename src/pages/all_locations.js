import { addCircle, createGenericMap, setCircleBorder } from "../genericmap/generic_map";
import dataCenters from "../data/data_centers.json";
import mitt from "mitt";


const map = createGenericMap('map');

// map.addCircle()

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
 * 
 * @param {string} dataCenterCode 
 * @returns {number} from 0 to 1, 0 = worst, 1 = best efficiency (from all datacenters)
 */
const getDataCenterEfficiency = (dataCenterCode) => {
  const rating = ratings.find(rating => rating.code === dataCenterCode);
  return (rating.value - bestRating.value) / (worstRating.value - bestRating.value);
}


const selectionEmitter = mitt();

const dataCenterInfoEl = document.querySelector(".data-center");
const titleEl = dataCenterInfoEl.querySelector("#title");
const regionNameEl = dataCenterInfoEl.querySelector("#regionName");
const efficiencyEl = dataCenterInfoEl.querySelector("#efficiency");
const setDataCenterInfo = (dataCenterCode) => {
  const dataCenter = dataCenters.find(dc => dc.code === dataCenterCode);

  titleEl.innerHTML = dataCenter.full_name;
  regionNameEl.innerHTML = dataCenter.code;

  const efficiency = getDataCenterEfficiency(dataCenterCode);
  efficiencyEl.innerHTML = Math.round(efficiency * 100) + "%"
  console.log(dataCenter);
  dataCenterInfoEl.classList.add("data-center--active");
}

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
      setDataCenterInfo(dataCenter.code);
    } else {
      setCircleBorder(circle, "none");
    }
  });
});
