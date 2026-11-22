import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { logError } from "@/lib/logger";

// The webhook projection in Sanity sends { "tags": [_type] }, e.g. { "tags": ["skills"] }
const bodySchema = z.object({ tags: z.array(z.string().min(1)).min(1) });

export async function POST(request: Request) {
  // Read per request, not at import: the build doesn't need the secret, so CI and Dependabot don't either
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    logError("SANITY_REVALIDATE_SECRET is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // The raw text, not request.json(): the signature covers the exact bytes Sanity sent
  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  if (!(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(safeJsonParse(body));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // "max": stale-while-revalidate, so no visitor ever waits for Sanity
  for (const tag of parsed.data.tags) revalidateTag(tag, "max");

  return NextResponse.json({ revalidated: parsed.data.tags });
}

// The body is signed, but a bad projection could still send invalid JSON: answer 400, not 500
function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}
