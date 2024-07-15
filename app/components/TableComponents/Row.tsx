import React from "react";
import { GasPrice } from "../../api/types";
import { volumes } from "../../api/constants";

type GasStationRowProps = {
  stationName: string;
  prices: GasPrice[];
  total: number;
  cheaper: boolean;
};

export const Row: React.FC<GasStationRowProps> = ({
  stationName,
  prices,
  total,
  cheaper,
}) => {
  if (!stationName || !prices) return null; // Handle null or undefined props gracefully

  const priceMap = prices.reduce((acc, { volume, price }) => {
    acc[volume] = price;
    return acc;
  }, {} as { [volume: string]: number });

  return (
    <tr className={` ${cheaper ? "bg-yellow-500/50" : "item"}  `}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 relative">
        {cheaper && (
          <span className="absolute -top-2 left-1 p-0.5 rounded-md bg-yellow-400 border-[1px] border-black">
            Cheaper
          </span>
        )}
        {stationName}
      </td>
      {volumes.map((volume) => (
        <td
          key={volume}
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell"
        >
          {priceMap[volume]?.toFixed(2)}€
        </td>
      ))}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {total}€
      </td>
    </tr>
  );
};
