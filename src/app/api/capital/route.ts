import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let countryCode = "JP";

    if (process.env.NODE_ENV !== "development") {
      const headerList = headers();
      const vercelCountry = (await headerList).get("x-vercel-ip-country");
      if (vercelCountry) {
        countryCode = vercelCountry;
      }
    }

    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    if (!response.ok) throw new Error("Country API failed");

    const data = await response.json();
    const capital = data[0]?.capital?.[0] || "Tokyo";

    return NextResponse.json({ capital });
  } catch (error) {
    console.error("Error fetching capital:", error);
    return NextResponse.json({ capital: "Tokyo" }, { status: 200 });
  }
}
