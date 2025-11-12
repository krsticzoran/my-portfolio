
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("x-middleware-test", "true");

  const supabase = await createClient();

  await supabase.auth.getUser();

  return response;
}

export const config = {
    matcher: ["/:path*"],
};
