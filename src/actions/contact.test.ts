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
});
