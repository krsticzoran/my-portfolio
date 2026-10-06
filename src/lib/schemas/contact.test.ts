import { describe, expect, it } from "vitest";

import { contactFormSchema } from "./contact";

const validData = {
  email: "jane@example.com",
  message: "Hello, I need a website.",
  startTime: Date.now(),
};

describe("contactFormSchema", () => {
  it("accepts valid data without the optional website field", () => {
    const result = contactFormSchema.safeParse(validData);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validData);
  });

  it("rejects an invalid email with a user-facing message", () => {
    const result = contactFormSchema.safeParse({ ...validData, email: "not-an-email" });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues[0].message).toBe("Please enter a valid email address");
  });

  describe("message length", () => {
    it("rejects a message one character under the minimum", () => {
      const result = contactFormSchema.safeParse({ ...validData, message: "a".repeat(9) });

      expect(result.success).toBe(false);
      if (result.success) return;
      expect(result.error.issues[0].message).toBe("Message must be at least 10 characters");
    });

    it("accepts a message at the minimum length", () => {
      const message = "a".repeat(10);

      const result = contactFormSchema.safeParse({ ...validData, message });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ ...validData, message });
    });

    it("accepts a message at the maximum length", () => {
      const message = "a".repeat(2000);

      const result = contactFormSchema.safeParse({ ...validData, message });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ ...validData, message });
    });

    it("rejects a message one character over the maximum", () => {
      const result = contactFormSchema.safeParse({ ...validData, message: "a".repeat(2001) });

      expect(result.success).toBe(false);
      if (result.success) return;
      expect(result.error.issues[0].message).toBe("Message cannot exceed 2000 characters");
    });
  });

  it("accepts a filled honeypot, leaving bot filtering to the server action", () => {
    const website = "spam";

    const result = contactFormSchema.safeParse({ ...validData, website });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ ...validData, website });
  });
});
