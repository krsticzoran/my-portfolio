import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { logError } from "@/lib/logger";

export async function GET() {
  try {
    const headerList = headers();
    const countryCode = (await headerList).get("x-vercel-ip-country") || "JP";

    // Capitals almost never change — revalidate once a month (30 days)
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`, {
      next: { revalidate: 2592000 },
    });

    if (!response.ok) {
      const text = await response.text();
      logError("Country API error:", text);
      return NextResponse.json({ capital: "Tokyo" }, { status: 200 });
    }

    const data = await response.json();
    let capital = data[0]?.capital?.[0] || "Tokyo";

    // If the detected country code is Georgia (GE), return Batumi instead of Tbilisi
    if (countryCode === "GE") {
      capital = "Batumi";
    }

    return NextResponse.json({ capital });
  } catch (error) {
    logError("Fetch error:", error);
    return NextResponse.json({ capital: "Tokyo" }, { status: 200 });
  }
}
