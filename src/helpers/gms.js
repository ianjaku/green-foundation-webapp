import { getStackDetails, getStacks } from "../components/gms_client";

export const getActiveRegionsFromStacks = (stacks) => {
  let regions = new Set();
  for (let stack of stacks) {
    regions.add(stack.region);
  }
  return Array.from(regions);
}

export const getAllResourcesForRegion = (region) => {
  const stacks = getStacks();
  const resources = [];
  for (let stack of stacks) {
    if (stack.region !== region) continue;
    const details = getStackDetails(stack.id);
    resources.push(...details.resources);
  }
  return resources;
}
