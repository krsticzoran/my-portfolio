import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getFreelanceExperience } from "./helpers";

describe("getFreelanceExperience", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns '1+ year' when less than two years have passed", () => {
    vi.setSystemTime(new Date("2025-06-01T00:00:00Z"));

    expect(getFreelanceExperience()).toBe("1+ year");
  });

  it("returns '1+ year' just before the two year mark", () => {
    vi.setSystemTime(new Date("2026-05-01T00:00:00Z"));

    expect(getFreelanceExperience()).toBe("1+ year");
  });

  it("returns '2+ years' exactly at the two year mark", () => {
    vi.setSystemTime(new Date("2026-05-01T12:00:00Z"));

    expect(getFreelanceExperience()).toBe("2+ years");
  });

  it("includes the actual number of years beyond two", () => {
    vi.setSystemTime(new Date("2029-06-01T00:00:00Z"));

    expect(getFreelanceExperience()).toBe("5+ years");
  });

  it("counts from a custom start date", () => {
    vi.setSystemTime(new Date("2023-06-01T00:00:00Z"));

    expect(getFreelanceExperience(new Date("2020-01-01T00:00:00Z"))).toBe("3+ years");
  });
});
