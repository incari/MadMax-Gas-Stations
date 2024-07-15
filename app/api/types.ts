/* // Type to be extendable to more stations and volumes.


export type GasPrices = {
  [stationName: string]: BottleSizes;
};

export type BottleSizes = {
  [volume: string]: number;
};
 */

export type StationsPrices = {
  stationsPrices: GasPrices;
};
export type GasPrices = GasStation[];

export type GasStation = {
  name: string;
  prices: GasPrice[];
};

export type GasPrice = {
  volume: string;
  price: number;
};

export type BottleSizes = {
  [volume: string]: number;
};
