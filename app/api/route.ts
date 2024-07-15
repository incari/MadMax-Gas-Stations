import { NextRequest, NextResponse } from "next/server";
import { generateGasPrices } from "../utils/helpers";
import { GasPrices } from "./types";
import { updateDataEvery } from "./constants";

/* To keep the same return value while the prices are the same.
 to avoid using a setTimeout that will delay the response x seconds.

 This way every request has a quick response and change the value after given time frame.
 */

let gasPrices: GasPrices[] = generateGasPrices();
let lastUpdated = Date.now();

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const updateData = Number(searchParams.get("update")) || updateDataEvery;

  const now = Date.now();
  if (now - lastUpdated > updateData * 1000) {
    // 5 seconds
    gasPrices = generateGasPrices();
    lastUpdated = now;
  }

  return NextResponse.json({ stationsPrices: gasPrices });
}
