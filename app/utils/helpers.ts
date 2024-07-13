import { priceRanges, stationCount, volumes } from "../api/contants";

import { BottleSizes, GasPrices } from "../api/types";

function generatePrices() {
  return priceRanges.map((range) =>
    Number((Math.random() * (range.max - range.min) + range.min).toFixed(2))
  );
}

export function generateGasPrices(): GasPrices[] {
  return Array.from({ length: stationCount }, (_, stationIndex) => {
    const prices = generatePrices();

    const priceObj: { [volume: string]: number } = {};
    volumes.forEach((volume, index) => {
      priceObj[volume] = prices[index];
    });

    return { [`Station ${stationIndex + 1}`]: priceObj };
  });
}

export function calculateBottles(liters: number): BottleSizes {
  const bottleSizes = [15, 5, 3, 1]; // Available bottle sizes, sorted in descending order
  const result: BottleSizes = {};

  for (const size of bottleSizes) {
    const quantity = Math.floor(liters / size);
    if (quantity > 0) {
      result[size.toString()] = quantity;
      liters -= quantity * size; // Subtract the amount covered by this bottle size
    }
    if (liters <= 0) break; // If all liters are covered, exit early
  }

  return result;
}

export function calculateTotalPrice(
  total: BottleSizes,
  stationsPrices: GasPrices[]
): number[] {
  const totals: number[] = stationsPrices.map((stationPrices) => {
    let totalPrice: number = 0;

    for (const stationName in stationPrices) {
      const prices = stationPrices[stationName];

      for (const volume in total) {
        if (prices[volume] !== undefined) {
          const priceByVolume = prices[volume] * total[volume];
          totalPrice += priceByVolume;
        }
      }
    }

    return Number(totalPrice.toFixed(2)); // Convert total price to number and fix to 2 decimal places
  });

  return totals;
}

export function findCheapestIndex(totals: number[]) {
  if (totals.length === 0) return -1;

  let min = totals[0];
  let index = 0;

  for (let i = 1; i < totals.length; i++) {
    if (totals[i] < min) {
      min = totals[i];
      index = i;
    }
  }

  return index;
}
