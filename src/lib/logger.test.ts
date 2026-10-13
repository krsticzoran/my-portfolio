import { afterEach, describe, expect, it, vi } from "vitest";

describe("logger", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it("logs errors in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { logError } = await import("./logger");
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    logError("Something failed", "details");

    expect(consoleSpy).toHaveBeenCalledWith("Something failed", "details");
  });

  it("does not log debug messages in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { log } = await import("./logger");
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    log("debug info");

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("logs debug messages in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { log } = await import("./logger");
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    log("debug info");

    expect(consoleSpy).toHaveBeenCalledWith("debug info");
  });
});
