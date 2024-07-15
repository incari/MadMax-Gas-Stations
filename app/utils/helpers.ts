import { GasPrices, GasStation, GasPrice, BottleSizes } from "../api/types";
import { priceRanges, stationCount, volumes } from "../api/constants";

function generatePrices(): number[] {
  return priceRanges.map((range) =>
    Number((Math.random() * (range.max - range.min) + range.min).toFixed(2))
  );
}

export function generateGasPrices(): GasPrices {
  return Array.from({ length: stationCount }, (_, stationIndex) => {
    const prices = generatePrices();

    const gasPrices: GasPrice[] = volumes.map((volume, index) => ({
      volume: volume.toString(), // Ensure volume is a string
      price: prices[index],
    }));

    return {
      name: `Station ${stationIndex + 1}`,
      prices: gasPrices,
    };
  });
}

export function calculateBottles(liters: number): BottleSizes {
  const bottleSizes = ["15", "5", "3", "1"]; // Available bottle sizes, sorted in descending order
  const result: BottleSizes = {};

  for (const size of bottleSizes) {
    const volume = parseInt(size, 10);
    const quantity = Math.floor(liters / volume);
    if (quantity > 0) {
      result[size] = quantity;
      liters -= quantity * volume; // Subtract the amount covered by this bottle size
    }
    if (liters <= 0) break; // If all liters are covered, exit early
  }

  return result;
}

export function calculateTotalPrice(
  total: BottleSizes,
  stationsPrices: GasPrices
): number[] {
  const totals: number[] = stationsPrices.map((station) => {
    let totalPrice = 0;

    for (const { volume, price } of station.prices) {
      if (total[volume]) {
        const priceByVolume = price * total[volume];
        totalPrice += priceByVolume;
      }
    }

    return Number(totalPrice.toFixed(2));
  });

  return totals;
}

export function findCheapestIndex(totals: number[]): number {
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
