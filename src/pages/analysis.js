import { getStackDetails, getStacks } from "../components/gms_client";
import { addCircle, createLeafletMap, setCircleBorder } from "../components/leaflet_map";
import dataCenters from "../data/data_centers.json";
import mitt from "mitt";
import { showDataCenterInfoBox } from "../components/data_center_info_box";

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
  
  const circle = addCircle(
    map,
    dataCenter.coords,
    "green",
    () => selectionEmitter.emit("select", stack.region),
    stack.region
  );

  selectionEmitter.on("select", (region) => {
    if (region === stack.region) {
      setCircleBorder(circle, "blue");
      showDataCenterInfoBox(
        dataCenter.full_name,
        [
          { label: "Region", value: region }
        ]
      );
    } else {
      setCircleBorder(circle, "none");
    }
  });
});
