// To control the amount of stations and bottle sizes
const stationCount = 10;
const volumes = [1, 3, 5, 15];

const refreshPriceEvery = 1 * 1000;

const priceRanges = [
  { min: 3.5, max: 4 },
  { min: 9, max: 10.5 },
  { min: 14, max: 15 },
  { min: 41, max: 42 },
];

export { stationCount, volumes, refreshPriceEvery, priceRanges };
