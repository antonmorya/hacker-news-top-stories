/**
 * Leave only unique values in given array
 * @param {Array} arr - Array of values that needs to become unique
 */
export const unique = (arr) => {
  const setOfElements = new Set(arr);

  return [...setOfElements];
};

/**
 * Simple generates one random number in specific range
 * @param {number} min - "from" range point
 * @param {number} max  - "to" range point
 */
export const randomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
