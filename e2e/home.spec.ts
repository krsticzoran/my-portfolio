import { expect, test } from "@playwright/test";

test("home page loads with title and main heading", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Zoran Krstić/);
  await expect(page.getByRole("heading", { level: 1, name: /Hi, I'm Zoran/ })).toBeVisible();
});
