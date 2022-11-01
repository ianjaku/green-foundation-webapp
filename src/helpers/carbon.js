import { getRatingForStack } from "../components/gms_client";

/**
 * Compare the given region to the list of datacenters.
 * 
 * @param {string} region 
 * @param {DataCenter[]} dataCenters must include the data center for "region"
 * @returns 
 */
export const getRelativeEfficiency = (
  region,
  dataCenters
) => {
  if (dataCenters.length <= 1) return 1;
  const dataCenter = dataCenters.find(dc => dc.code === region);

  const ratings = dataCenters.map(dc => {
    const rating = getRatingForStack(dc.code);
    return {
      region: dc.code,
      value: rating
    }
  });

  const bestRating = ratings.reduce((a, b) => a.value < b.value ? a : b);
  const worstRating = ratings.reduce((a, b) => a.value > b.value ? a : b);

  const rating = ratings.find(rating => rating.region === dataCenter.code);
  return (rating.value - bestRating.value) / (worstRating.value - bestRating.value);
}
