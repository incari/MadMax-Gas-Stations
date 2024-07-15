import { NextRequest, NextResponse } from "next/server";
import { generateGasPrices } from "../utils/helpers";
import { GasPrices } from "./types";
import { updateDataEvery } from "./constants";

let gasPrices: GasPrices = generateGasPrices(); // Adjusted type to GasPrices
let lastUpdated = Date.now();

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Use default update interval or the one provided in the request
  const updateData = Number(searchParams.get("update")) || updateDataEvery;

  const now = Date.now();
  if (now - lastUpdated > updateData * 1000) {
    // Update gas prices if the specified time frame has passed
    gasPrices = generateGasPrices();
    lastUpdated = now;
  }

  return NextResponse.json({ stationsPrices: gasPrices });
}
