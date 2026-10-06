import { describe, expect, it } from "vitest";

import { sanitizeInput } from "./sanitize";

describe("sanitizeInput", () => {
  it("escapes < and > characters", () => {
    const result = sanitizeInput("<script>alert(1)</script>");

    expect(result).toBe("&lt;script&gt;alert(1)&lt;/script&gt;");
  });

  it.each(["Hello, I need a website", "", "line one\nline two"])(
    "leaves safe input unchanged: %j",
    (input) => {
      expect(sanitizeInput(input)).toBe(input);
    }
  );

  it("truncates long input to 2000 characters", () => {
    const result = sanitizeInput("a".repeat(2500));

    expect(result).toHaveLength(2000);
  });

  it("truncates input that is one character over the limit", () => {
    const result = sanitizeInput("a".repeat(2001));

    expect(result).toHaveLength(2000);
  });
});
