import path from "node:path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  // Compile JSX in tests. tsconfig has "jsx": "preserve" (Next compiles JSX itself),
  // but Vitest has no Next compiler, so it must turn JSX into JS here.
  oxc: { jsx: { runtime: "automatic" } },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  test: {
    environment: "node",
    // e2e/ holds Playwright tests; they run with `npx playwright test`, not Vitest.
    exclude: [...configDefaults.exclude, "e2e/**"],
  },
});
