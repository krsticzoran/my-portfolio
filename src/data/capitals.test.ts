import { describe, expect, it } from "vitest";

import { getThirdCity } from "./capitals";

describe("getThirdCity", () => {
  it("uses Tokyo for a visitor from Germany", () => {
    expect(getThirdCity("Berlin")).toBe("Tokyo");
  });

  it("uses Tokyo for a visitor from the USA", () => {
    expect(getThirdCity("Washington D.C.")).toBe("Tokyo");
  });

  it("uses Tokyo for a visitor from Japan", () => {
    expect(getThirdCity("Tokyo")).toBe("Tokyo");
  });

  it("uses the visitor's capital for any other country", () => {
    expect(getThirdCity("Belgrade")).toBe("Belgrade");
  });
});
