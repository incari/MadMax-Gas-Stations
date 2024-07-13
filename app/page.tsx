"use client";
import useSWR from "swr";

import { Row } from "./components/table/Row";
import { Table } from "./components/table/Table";
import { useState } from "react";
import { StationsPrices } from "./api/types";

const fetcher = async (url: string): Promise<StationsPrices> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch gas prices");
  }
  return response.json();
};

export default function Home() {
  const { data, error, isLoading } = useSWR("/api", fetcher, {
    refreshInterval: 500,
  });
  const [value, setValue] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-cover bg-center bg-[url('/bg-madmax.webp')]">
      <div className="mb-4">
        <label
          htmlFor="liters"
          className="block text-lg font-bold text-gray-100 mb-2 bg-gray-500/15 w-fit"
        >
          Liters to buy
        </label>
        <input
          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
          id="liters"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          type="number"
          min="0"
        />
      </div>
      <div className="">
        {error && <div>Failed to load</div>}
        {isLoading && <div>Loading...</div>}
        {data && (
          <Table
            stationsPrices={data.stationsPrices}
            liters={value}
          />
        )}
      </div>
    </main>
  );
}
