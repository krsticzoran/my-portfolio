import { expect, type Page, test } from "@playwright/test";

// Opens the RankinWorld project modal and returns it, already checked to be visible
const openProject = async (page: Page) => {
  await page.getByRole("button", { name: /Open project details: RankinWorld/ }).click();

  const dialog = page.getByRole("dialog", { name: /RankinWorld/ });
  await expect(dialog).toBeVisible();

  return dialog;
};

test.describe("project modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("clicking a project card opens its details", async ({ page }) => {
    await openProject(page);
  });

  test("close button closes the modal", async ({ page }) => {
    const dialog = await openProject(page);
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await dialog.getByRole("button", { name: "Close project details" }).click();

    await expect(dialog).toBeHidden();
    await expect(page.locator("body")).toHaveCSS("overflow", "auto");
  });

  test("Escape key closes the modal", async ({ page }) => {
    const dialog = await openProject(page);
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("Escape");

    await expect(dialog).toBeHidden();
    await expect(page.locator("body")).toHaveCSS("overflow", "auto");
  });

  test("clicking outside closes the modal", async ({ page, isMobile }) => {
    test.skip(isMobile, "the modal covers the whole screen on phones, there is no outside");
    const dialog = await openProject(page);
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page.mouse.click(10, 10);

    await expect(dialog).toBeHidden();
    await expect(page.locator("body")).toHaveCSS("overflow", "auto");
  });

  test("focus moves to the close button and returns to the card", async ({ page }) => {
    const card = page.getByRole("button", { name: /Open project details: RankinWorld/ });

    const dialog = await openProject(page);
    await expect(dialog.getByRole("button", { name: "Close project details" })).toBeFocused();

    await page.keyboard.press("Escape");

    await expect(dialog).toBeHidden();
    await expect(card).toBeFocused();
  });

  test("a project can be opened with the keyboard", async ({ page }) => {
    const rankinCard = page.getByRole("button", { name: /Open project details: RankinWorld/ });
    await rankinCard.focus();
    await expect(rankinCard).toBeFocused();

    await page.keyboard.press("Tab");
    const miriamCard = page.getByRole("button", { name: /Open project details: Miriam's Joy/ });
    await expect(miriamCard).toBeFocused();

    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: /Miriam's Joy/ });
    await expect(dialog).toBeVisible();
  });
});
