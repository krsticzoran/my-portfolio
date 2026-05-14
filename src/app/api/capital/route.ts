import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getCapital } from "@/lib/capitals";
import { capitalsRateLimiter } from "@/lib/rate-limit";

export const runtime = "edge";

export async function GET() {
  const headerList = await headers();

  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { success } = await capitalsRateLimiter.limit(ip);
  if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const countryCode = headerList.get("x-vercel-ip-country") || "JP";
  const capital = getCapital(countryCode);
  return NextResponse.json({ capital });
}
