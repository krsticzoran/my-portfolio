import { cacheTag } from "next/cache";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { client } from "./client";
import { getSkills } from "./skills";

// Outside Next, cacheTag/cacheLife would throw, and "use cache" is just an ignored string
vi.mock("next/cache", () => ({ cacheTag: vi.fn(), cacheLife: vi.fn() }));
// The real client would read env variables and go to the network
vi.mock("./client", () => ({ client: { fetch: vi.fn() } }));

// Makes the mocked client.fetch answer with `response`. client.fetch has several overloads and
// TypeScript checks the mock against the wrong one, so the value is cast; the tests feed it bad
// data on purpose anyway.
function sanityReturns(response: unknown) {
  vi.mocked(client.fetch).mockResolvedValue(response as never);
}

describe("getSkills", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the skills from Sanity and tags the cache for the webhook", async () => {
    sanityReturns(["React", "Next.js"]);

    await expect(getSkills()).resolves.toEqual(["React", "Next.js"]);
    expect(cacheTag).toHaveBeenCalledWith("skills");
  });

  it("rejects a missing skills document", async () => {
    // `*[_id == "skills"][0].items` is null when the document doesn't exist, not an empty list
    sanityReturns(null);

    await expect(getSkills()).rejects.toThrow();
  });

  it("rejects an empty skill name", async () => {
    sanityReturns(["React", ""]);

    await expect(getSkills()).rejects.toThrow();
  });
});
