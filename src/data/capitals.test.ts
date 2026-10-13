import { describe, expect, it } from "vitest";

import { getCapital, getThirdCity } from "./capitals";

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

describe("getCapital", () => {
  it("returns the capital for a known country code", () => {
    expect(getCapital("RS")).toBe("Belgrade");
  });

  it("accepts a lowercase country code", () => {
    expect(getCapital("rs")).toBe("Belgrade");
  });

  it("falls back to Tokyo for an unknown country code", () => {
    expect(getCapital("XX")).toBe("Tokyo");
  });
});
