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
    return {
      region: dc.code,
      value: getRatingForStack(dc.code)
    }
  });

  const bestRating = ratings.reduce((a, b) => a.value < b.value ? a : b);
  const worstRating = ratings.reduce((a, b) => a.value > b.value ? a : b);

  const rating = ratings.find(rating => rating.region === dataCenter.code);
  return (rating.value - worstRating.value) / (bestRating.value - worstRating.value);
  // return (rating.value - bestRating.value) / (worstRating.value - bestRating.value);
}

// uitstootA, besteUitstoot
// uitstootA - slechtste, besteUitstoot - slechtste
// percentage = uitstootA - slechtste / besteUitstoot - slechtste
