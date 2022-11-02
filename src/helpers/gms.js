import { getStackDetails, getStacks } from "../components/gms_client";

export const getActiveRegionsFromStacks = (stacks) => {
  let regions = new Set();
  for (let stack of stacks) {
    regions.add(stack.region);
  }
  return Array.from(regions);
}

export const getAllStacksForRegion = (region) => {
  const stacks = getStacks();
  return stacks.filter((stack) => stack.region === region);
}
