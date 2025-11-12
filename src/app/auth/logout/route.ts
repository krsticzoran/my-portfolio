import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server"; 

export async function GET(request: NextRequest) {
  const nextUrl = new URL(request.url);
  const redirectTo = nextUrl.searchParams.get("next") || "/"; 

  const supabase = await createClient();

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL(redirectTo, request.url));
}
