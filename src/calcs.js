import { coordinatesForCountryCode, findLowest, pingBetweenTwoCoordinates, sum } from "./carbonhelpers";

const countries = ["BE", "NL", "GE"];
const serviceLocations = [[50.1109, 8.6821], [50.8476, 4.3572]]; // Frankfurt & Brussels

const dataCenters = [
  {
    name: "Frankfurt",
    coords: [50.1109, 8.6821],
    carbonEfficiency: 500 // higher is better?
  },
  {
    name: "Brussels",
    coords: [50.8476, 4.3572],
    carbonEfficiency: 300 // higher is better?
  }
]

/**
 * Ping efficiency
 * 
 * Carbon efficiency
 * 
 * 
 */

/**
 * @param {string[]} userCountryCodes country codes of countries where users live
 * @param {DataCenter} dataCenters coordinates where servers are (format: [lng, lat])
 * 
 */
// TODO: User typescript "non strict" to define DataCenter
const calcEfficiencies = (userCountryCodes, dataCenters) => {
  /**
   * Find optimal location for both ping & carbon efficiency
   * 
   * 1. Find best option (ping related)
   * 2. Find all options within a 20% variance
   * 3. Rank all regions for carbon efficiency
   */
  const dataCentersPingMap = createDataCenterPingMap(userCountryCodes, dataCenters);

  // TODO: maybe we need to watch out for peaks in pings (aka some countries with very high ping and others with very low instead of consistent)
  // TODO: if this happens we can suggest using more data centers (but only if the ping difference is bigger than like 100ms)
  // const bestDataCenterByPing = findBestDataCenterNameByPing(dataCentersPingMap);

  const dataCenterPingSumsMap = dataCenters.reduce((map, dataCenter) => {
    const pingMap = dataCentersPingMap[dataCenter.name];
    map[dataCenter.name] = sum(Object.values(pingMap));
    return map;
  }, {});
  const bestDataCenterByPing = findLowest(
    Object.keys(dataCenterPingSumsMap),
    (v) => dataCentersPingMap[v]
  );
  const bestPing = dataCenterPingSumsMap[bestDataCenterByPing];
  // TODO: Revize this, currently: 20% or 20ms (does it maybe need to depend on how many we find? Or should the user be able to set this?)
  // Also includes the best data center
  const goodEnoughDataCenters = dataCenters.filter(dataCenter => {
    const ping = dataCenterPingSumsMap[dataCenter.name];
    if (ping - bestPing < 20) return true;
    if (bestPing - ping < bestPing * 0.2) return true;
    return false;
  });

  const bestCarbonEfficiencyDataCenter = findLowest(goodEnoughDataCenters, (v) => v.carbonEfficiency);
  const bestCarbonEfficiency = bestCarbonEfficiencyDataCenter.carbonEfficiency;

  // DataCenterName -> Efficiency compared to best efficiency (1 = the same, 2 = double)
  const carbonEfficiencyComparisonMap = {};
  for (let dataCenter of dataCenters) {
    const efficiency = dataCenter.carbonEfficiency / bestCarbonEfficiency;
    carbonEfficiencyComparisonMap[dataCenter.name] = efficiency;
  }

  // TODO: we should count carbon efficiency with X% to be the same value since it has some variance anyway

  // Now i have the carbon efficiency per country
  // Now we just need to weight it?



  
  // const dataCenterCarbonEfficiency = dataCenters
  // dataCenter.name -> userCountryCode -> ping
  // Carbon efficiency of the dataCenters

  return {
    dataCentersPingMap,
    bestDataCenterByPing,
    carbonEfficiencyComparisonMap
  }
  
  // TODO: calc ping efficiency
  // TODO: calc carbon efficiency
}

/**
 * @param {[number, number][]} coordsList
 */
const fetchCarbonEfficiency = (coordsList) => {
  // TODO: fetch carbon efficiency
}

/**
 * @param {string[]} countryCodes alpha-2 code of coutries
 */
const createDataCenterPingMap = (userCountryCodes, dataCenters) => {
  const dataCenterPingMap = {};

  /**
   * For every server location, calculate the ping efficiency to every userCountry
   */
  for (const dataCenter of dataCenters) {
    const dataCenterCoords = dataCenter.coords;

    for (const userCountryCode of userCountryCodes) {
      const userCountryCoords = coordinatesForCountryCode(userCountryCode);
      const ping = pingBetweenTwoCoordinates(dataCenterCoords, userCountryCoords);
      if (dataCenterPingMap[dataCenter.name] == null) {
        dataCenterPingMap[dataCenter.name] = {};
      }
      dataCenterPingMap[dataCenter.name][userCountryCode] = ping;
    }
  }

  return dataCenterPingMap;
}

/**
 * @param {PingMap} dataCenterPingMap 
 * @returns {string} name of the data center
 */
const findBestDataCenterNameByPing = (dataCenterPingMap) => {
  let lowestPingSum = null;
  let bestDataCenterName = null;

  for (let dataCenterName of Object.keys(dataCenterPingMap)) {
    const pingMap = dataCenterPingMap[dataCenterName];
    const currentPingSum = sum(Object.values(pingMap));

    if (lowestPingSum == null || lowestPingSum > currentPingSum) {
      lowestPingSum = currentPingSum;
      bestDataCenterName = dataCenterName;
    }
  }

  return bestDataCenterName;
}





// (() => (calcEfficiencies(countries, dataCenters)))();
console.log(calcEfficiencies(countries, dataCenters));