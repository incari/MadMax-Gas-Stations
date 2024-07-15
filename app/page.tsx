"use client";

import useSWR from "swr";
import { useState } from "react";
import { StationsPrices } from "./api/types";
import { refreshPriceEvery, updateDataEvery } from "./api/constants";
import { ButtonNumber } from "./components/ButtonNumber/ButtonNumber";
import { Table } from "./components/Table";

const fetcher = async (
  url: string,
  dataUpdate: number
): Promise<StationsPrices> => {
  const response = await fetch(`${url}?update=${dataUpdate}`);
  if (!response.ok) {
    throw new Error("Failed to fetch gas prices");
  }
  return response.json();
};

export default function Home() {
  const [gas, setGas] = useState(0);

  // Some control buttons to play with the speed of refreshing and requesting data
  const [refreshTime, setRefreshTime] = useState(refreshPriceEvery);
  const [dataUpdate, setDataUpdate] = useState(updateDataEvery);

  // Check new data every x seg.
  const { data, error, isLoading } = useSWR(
    "/api",
    (arg) => fetcher(arg, dataUpdate),
    {
      refreshInterval: refreshTime * 1000,
    }
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-cover bg-center bg-[url('/bg-madmax.webp')]">
      <div className="flex gap-2 absolute top-0 right-4">
        <div className="flex flex-col">
          <label>Refresh every</label>
          <ButtonNumber
            value={refreshTime}
            setValue={setRefreshTime}
          />
        </div>
        <div className="flex flex-col">
          <label>Update Every</label>
          <ButtonNumber
            value={dataUpdate}
            setValue={setDataUpdate}
          />
        </div>
      </div>
      <div className="mb-4 flex items-center flex-col">
        <label
          htmlFor="liters"
          className="block text-2xl font-bold text-gray-900 mb-2 "
        >
          Liters to buy
        </label>
        <ButtonNumber
          value={gas}
          setValue={setGas}
        />
        <div className="">
          {error && <div>Failed to load</div>}
          {isLoading && <div>Loading...</div>}
          {data && (
            <Table
              stationsPrices={data.stationsPrices}
              liters={gas}
            />
          )}
        </div>
      </div>
    </main>
  );
}
