import { headers } from "next/headers";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { capitalsRateLimiter } from "@/lib/rate-limit";

import { GET } from "./route";

vi.mock("next/headers", () => ({ headers: vi.fn() }));
vi.mock("@/lib/rate-limit", () => ({ capitalsRateLimiter: { limit: vi.fn() } }));

describe("GET /api/capital", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(capitalsRateLimiter.limit).mockResolvedValue({ success: true } as never);
  });

  it("returns the capital of the visitor's country", async () => {
    vi.mocked(headers).mockResolvedValue(
      new Headers({ "x-forwarded-for": "1.2.3.4", "x-vercel-ip-country": "RS" }) as never
    );

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ capital: "Belgrade" });
  });

  it("falls back to Tokyo when the country header is empty", async () => {
    vi.mocked(headers).mockResolvedValue(
      new Headers({ "x-forwarded-for": "1.2.3.4", "x-vercel-ip-country": "" }) as never
    );

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ capital: "Tokyo" });
  });

  it("falls back to Tokyo when the country header is missing", async () => {
    vi.mocked(headers).mockResolvedValue(new Headers({ "x-forwarded-for": "1.2.3.4" }) as never);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ capital: "Tokyo" });
  });

  it("returns 429 when the rate limit is exceeded", async () => {
    vi.mocked(headers).mockResolvedValue(new Headers() as never);
    vi.mocked(capitalsRateLimiter.limit).mockResolvedValueOnce({ success: false } as never);

    const response = await GET();

    expect(response.status).toBe(429);
    expect(await response.json()).toEqual({ error: "Too many requests" });
  });
});
