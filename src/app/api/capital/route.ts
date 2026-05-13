import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getCapital } from "@/lib/capitals";

export const runtime = "edge";

export async function GET() {
  const headerList = await headers();
  const countryCode = headerList.get("x-vercel-ip-country") || "JP";
  const capital = getCapital(countryCode);
  return NextResponse.json({ capital });
}
