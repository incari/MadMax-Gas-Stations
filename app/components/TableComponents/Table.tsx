import { volumes } from "../../api/constants";
import { StationsPrices } from "../../api/types";
import {
  calculateBottles,
  calculateTotalPrice,
  findCheapestIndex,
} from "../../utils/helpers";
import { Row } from "./Row";

type TableProps = StationsPrices & {
  liters: number;
};

export const Table: React.FC<TableProps> = ({ stationsPrices, liters }) => {
  const totalBottles = calculateBottles(liters);

  const totalByStation = calculateTotalPrice(totalBottles, stationsPrices);
  const cheaper = findCheapestIndex(totalByStation);

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 bg-[#e0cdc4]">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Petrol Station
            </th>
            {volumes.map((volume) => (
              <th
                key={volume}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                {`${volume}L `}

                <span className={totalBottles[volume] ? "text-yellow-600" : ""}>
                  ({totalBottles[volume] || 0})
                </span>
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stationsPrices.map((station, index) => {
            const stationName = Object.keys(station)[0];
            const prices = station[stationName];

            return (
              <Row
                key={index}
                stationName={stationName}
                prices={prices}
                total={totalByStation[index]}
                cheaper={cheaper === index}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
