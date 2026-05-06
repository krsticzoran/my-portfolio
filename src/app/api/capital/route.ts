import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { logError } from "@/lib/logger";

export async function GET() {
  try {
    const headerList = headers();
    const countryCode = (await headerList).get("x-vercel-ip-country") || "JP";

    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);

    if (!response.ok) {
      const text = await response.text();
      logError("Country API error:", text);
      return NextResponse.json({ capital: "Tokyo" }, { status: 200 });
    }

    const data = await response.json();
    const capital = data[0]?.capital?.[0] || "Tokyo";

    return NextResponse.json({ capital });
  } catch (error) {
    logError("Fetch error:", error);
    return NextResponse.json({ capital: "Tokyo" }, { status: 200 });
  }
}
