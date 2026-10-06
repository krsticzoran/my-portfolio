import { describe, expect, it } from "vitest";

import { sanitizeInput } from "./sanitize";

describe("sanitizeInput", () => {
  it("escapes < and > characters", () => {
    const result = sanitizeInput("<script>alert(1)</script>");

    expect(result).toBe("&lt;script&gt;alert(1)&lt;/script&gt;");
  });
});
