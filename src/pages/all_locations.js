import dataCenters from "../data/data_centers.json";
import mitt from "mitt";
import { createLeafletMap, addCircle, setCircleBorder } from "../components/leaflet_map";
import { showDataCenterInfoBox } from "../components/data_center_info_box";
import { hideStackInfoBox, showStackInfoBox } from "../components/stack_info_box";
import { getRatingForStack, getStacks } from "../components/gms_client";


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


const emitter = mitt();


dataCenters.forEach(dataCenter => {
  const efficiency = getDataCenterEfficiency(dataCenter.code);
  const red = 255 * (1 - efficiency);
  const green = 255 * efficiency;

  const onClick = () => {
    emitter.emit("select", dataCenter.code);
  }
  const circle = addCircle(map, dataCenter.coords, `rgba(${red}, ${green}, 0)`, onClick, dataCenter.code);

  emitter.on("select", (code) => {
    hideStackInfoBox();
    if (code === dataCenter.code) {
      const stacksExpansion = `<button id="expand_${dataCenter.code}">Expand</button>`;
      setCircleBorder(circle, "blue");
      showDataCenterInfoBox(
        dataCenter.full_name,
        [
          { label: "Region code", value: dataCenter.code },
          { label: "Carbon Efficiency", value: Math.round(efficiency * 100) + "%" },
          { label: "Stacks", value: stacksExpansion } // TODO: maybe have button only when there are stacks
        ]
      );
      document.getElementById(`expand_${dataCenter.code}`)
        .addEventListener('click', () => { emitter.emit("expand", dataCenter.code); }, false);
    } else {
      setCircleBorder(circle, "none");
    }
  });

  emitter.on("expand", (code) => {
    const stacks = getStacks();
    const regionStacks = stacks.filter((stack) => stack.region === code)
      .map((stack) => ({
        "label": stack.name.split('/')[1], // Just the name
        "value": getRatingForStack(stack.id)
      }));
      const title = regionStacks.length === 0 ? `No stacks in ${code}` : `Stacks in ${code}`;
    showStackInfoBox(
      title,
      regionStacks
    );
  });
});
