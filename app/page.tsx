"use client";
import useSWR from "swr";
import { Table } from "./components/Table/Table";
import { useState } from "react";
import { StationsPrices } from "./api/types";
import Hero from "./components/Hero/Hero";

const fetcher = async (url: string): Promise<StationsPrices> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch gas prices");
  }
  return response.json();
};

export default function Home() {
  // Check new data every 10 seg.
  const { data, error, isLoading } = useSWR("/api", fetcher, {
    refreshInterval: 10 * 1000,
  });

  const [value, setValue] = useState(0);

  const disableButton = Boolean(value <= 0);

  const handleButtons = (type: "add" | "subtract") => {
    if (type === "add") {
      setValue((value) => value + 1);
    }
    if (type === "subtract") {
      setValue((value) => {
        return value <= 0 ? 0 : value - 1;
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-cover bg-center bg-[url('/bg-madmax.webp')]">
      <div className="mb-4 flex items-center flex-col">
        <label
          htmlFor="liters"
          className="block text-2xl font-bold text-gray-900 mb-2 "
        >
          Liters to buy
        </label>
        <div
          className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg 
        dark:bg-neutral-900 dark:border-neutral-700 my-2"
          data-hs-input-number=""
        >
          <div className="flex items-center gap-x-1.5">
            <button
              type="button"
              className="size-6 inline-flex justify-center items-center gap-x-2 text-sm 
               font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm
                hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900
                 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              data-hs-input-number-decrement=""
              onClick={() => handleButtons("subtract")}
              disabled={disableButton}
            >
              <svg
                className="flex-shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14"></path>
              </svg>
            </button>
            <input
              className="p-0 w-16 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white "
              id="liters"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              type="number"
              min="0" // Prevent negative values
              pattern="\d*" // Trigger IOS number pad
            />
            <button
              type="button"
              className="size-6 inline-flex justify-center items-center gap-x-2 text-sm 
          font-medium rounded-md border border-gray-200 bg-white text-gray-800 
          shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none
           dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              data-hs-input-number-increment=""
              onClick={() => handleButtons("add")}
            >
              <svg
                className="flex-shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </button>
          </div>
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
      </div>
    </main>
  );
}
