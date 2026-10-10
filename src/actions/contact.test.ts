import { headers } from "next/headers";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { contactRateLimiter } from "@/lib/rate-limit";

import { submitContactForm } from "./contact";

const sendMock = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({ headers: vi.fn() }));
vi.mock("@/lib/rate-limit", () => ({ contactRateLimiter: { limit: vi.fn() } }));
vi.mock("@/lib/logger", () => ({ logError: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

const NOW = new Date("2026-01-01T12:00:00Z").getTime();

const validData = {
  email: "jane@example.com",
  message: "Hello, I need a website.",
  startTime: NOW - 5000,
};

describe("submitContactForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);

    vi.mocked(headers).mockResolvedValue(new Headers({ "x-forwarded-for": "1.2.3.4" }) as never);
    vi.mocked(contactRateLimiter.limit).mockResolvedValue({ success: true, reset: NOW } as never);
    sendMock.mockResolvedValue({ data: { id: "email-id" }, error: null });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("returns the first schema error for invalid data", async () => {
    const result = await submitContactForm({ ...validData, email: "not-an-email" });

    expect(result).toEqual({ success: false, message: "Please enter a valid email address" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a submission with the honeypot field filled", async () => {
    const result = await submitContactForm({ ...validData, website: "spam" });

    expect(result).toEqual({
      success: false,
      message: "Honeypot field filled, likely a bot submission",
    });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a whitespace-only message that passes the schema length check", async () => {
    const result = await submitContactForm({ ...validData, message: " ".repeat(10) });

    expect(result).toEqual({
      success: false,
      message: "Comment cannot be empty or whitespace only",
    });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a form submitted after only one second", async () => {
    const result = await submitContactForm({ ...validData, startTime: NOW - 1000 });

    expect(result).toEqual({ success: false, message: "Form submitted too quickly" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a form submitted one millisecond before the three second minimum", async () => {
    const result = await submitContactForm({ ...validData, startTime: NOW - 2999 });

    expect(result).toEqual({ success: false, message: "Form submitted too quickly" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("accepts a form submitted exactly at the three second minimum", async () => {
    const result = await submitContactForm({ ...validData, startTime: NOW - 3000 });

    expect(result).toEqual({ success: true });
    expect(sendMock).toHaveBeenCalled();
  });

  describe("rate limiting", () => {
    it("rejects with a singular minute when the limit resets within a minute", async () => {
      vi.mocked(contactRateLimiter.limit).mockResolvedValueOnce({
        success: false,
        reset: NOW + 60_000,
      } as never);

      const result = await submitContactForm(validData);

      expect(result).toEqual({
        success: false,
        message: "Too many requests. Please try again in 1 minute.",
      });
      expect(contactRateLimiter.limit).toHaveBeenCalledWith("1.2.3.4");
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("rejects with plural minutes when the limit resets in several minutes", async () => {
      vi.mocked(contactRateLimiter.limit).mockResolvedValueOnce({
        success: false,
        reset: NOW + 5 * 60_000,
      } as never);

      const result = await submitContactForm(validData);

      expect(result).toEqual({
        success: false,
        message: "Too many requests. Please try again in 5 minutes.",
      });
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("rounds the remaining wait time up to the next full minute", async () => {
      vi.mocked(contactRateLimiter.limit).mockResolvedValueOnce({
        success: false,
        reset: NOW + 61_000,
      } as never);

      const result = await submitContactForm(validData);

      expect(result).toEqual({
        success: false,
        message: "Too many requests. Please try again in 2 minutes.",
      });
      expect(sendMock).not.toHaveBeenCalled();
    });
  });

  describe("client IP for rate limiting", () => {
    it("uses the first address from a forwarded-for list", async () => {
      vi.mocked(headers).mockResolvedValueOnce(
        new Headers({ "x-forwarded-for": "5.6.7.8, 10.0.0.1" }) as never
      );

      await submitContactForm(validData);

      expect(contactRateLimiter.limit).toHaveBeenCalledWith("5.6.7.8");
    });

    it("falls back to 'unknown' when the forwarded-for header is empty", async () => {
      vi.mocked(headers).mockResolvedValueOnce(new Headers({ "x-forwarded-for": "" }) as never);

      await submitContactForm(validData);

      expect(contactRateLimiter.limit).toHaveBeenCalledWith("unknown");
    });

    it("falls back to 'unknown' when the forwarded-for header is missing", async () => {
      vi.mocked(headers).mockResolvedValueOnce(new Headers() as never);

      await submitContactForm(validData);

      expect(contactRateLimiter.limit).toHaveBeenCalledWith("unknown");
    });
  });
});
