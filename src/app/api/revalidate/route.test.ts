import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidateTag } from "next/cache";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "./route";

vi.mock("next/cache", () => ({ revalidateTag: vi.fn() }));
// Keeps the expected "secret is not set" error out of the test output
vi.mock("@/lib/logger", () => ({ logError: vi.fn() }));

const SECRET = "test-secret";
const BODY = JSON.stringify({ tags: ["skills"] });

// The signature is made with the real library, so the tests check the real crypto, not a mock
function sign(body: string, secret = SECRET) {
  return encodeSignatureHeader(body, Date.now(), secret);
}

function request(body: string, signature?: string) {
  return new Request("http://localhost/api/revalidate", {
    method: "POST",
    headers: signature ? { [SIGNATURE_HEADER_NAME]: signature } : {},
    body,
  });
}

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("SANITY_REVALIDATE_SECRET", SECRET);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("revalidates the tags from a correctly signed request", async () => {
    const response = await POST(request(BODY, await sign(BODY)));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ revalidated: ["skills"] });
    expect(revalidateTag).toHaveBeenCalledWith("skills", "max");
  });

  it("rejects a request signed with a different secret", async () => {
    const response = await POST(request(BODY, await sign(BODY, "wrong-secret")));

    expect(response.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a body changed after it was signed", async () => {
    const signature = await sign(BODY);
    const tampered = JSON.stringify({ tags: ["projects"] });

    const response = await POST(request(tampered, signature));

    expect(response.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects a request without a signature", async () => {
    const response = await POST(request(BODY));

    expect(response.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it.each([
    ["an empty tag list", JSON.stringify({ tags: [] })],
    ["a missing tag list", JSON.stringify({ _type: "skills" })],
    ["invalid JSON", "not json"],
  ])("returns 400 for a signed body with %s", async (_, body) => {
    const response = await POST(request(body, await sign(body)));

    expect(response.status).toBe(400);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("returns 500 when the secret is not set on the server", async () => {
    vi.stubEnv("SANITY_REVALIDATE_SECRET", undefined);

    const response = await POST(request(BODY, await sign(BODY)));

    expect(response.status).toBe(500);
    expect(revalidateTag).not.toHaveBeenCalled();
  });
});
