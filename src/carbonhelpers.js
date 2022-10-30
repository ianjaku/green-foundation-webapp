
const PING_PER_DEGREE = 50;

/**
 * @param {[number, number]} coord1 [lang, lat]
 * @param {[number, number]} coord2 [lang, lat]
 * @returns {number} the expected ping
 */
export const pingBetweenTwoCoordinates = (coord1, coord2) => {
  const langDiff = Math.abs(coord1[0] - coord2[0]);
  const latDiff = Math.abs(coord1[1] - coord2[1]);
  // TODO: If we pow the "ping/degree" then we don't need to sqrt
  const degreesBetweenPoints = Math.sqrt(Math.pow(langDiff, 2) + Math.pow(latDiff, 2));
  return degreesBetweenPoints * PING_PER_DEGREE;
}

/**
 * @param {string} countryCode country code
 */
export const coordinatesForCountryCode = (countryCode) => {
  // TODO: Get from a json file or fetch from an endpoint

  if (countryCode.toLowerCase() === "be") {
    return [50.8476, 4.3572]; // Brussels
  }
  if (countryCode.toLowerCase() === "ge") {
    return [52.5200, 13.4050]; // Berlin
  }
  if (countryCode.toLowerCase() === "nl") {
    return [52.3676, 4.9041]; // Amsterdam
  }
}

export const sum = (nrs) => {
  return nrs.reduce((a, b) => a + b, 0);
}

export const findLowest = (
  values,
  getValue = (v) => v
) => {
  return values.reduce((a, b) => {
    const aVal = getValue(a);
    const bVal = getValue(b);
    if (aVal < bVal) {
      return a;
    } else {
      return b;
    }
  });
}