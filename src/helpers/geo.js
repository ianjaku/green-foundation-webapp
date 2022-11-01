
/**
 * @param {[number, number]} pos1
 * @param {[number, number]} pos2
 * @returns {number} the distance in degrees
 */
export const getDistanceBetweenTwoCoords = (
  pos1,
  pos2
) => {
  const longDiff = Math.abs(pos1[0] - pos2[0]) % 90;
  const latDiff = Math.abs(pos1[1] - pos2[1]) % 180;
  return Math.sqrt(Math.pow(longDiff, 2) + Math.pow(latDiff, 2));
}
