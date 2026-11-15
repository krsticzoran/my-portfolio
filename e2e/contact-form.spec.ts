import { expect, type Page, test } from "@playwright/test";

// Every test leaves at least one field invalid, so the form never really submits (no real emails)

const emailError = "Please enter a valid email address";
const messageError = "Message must be at least 10 characters";

// Scrolls to the contact section and returns the submit button, already checked to be visible
const openContactForm = async (page: Page) => {
  await page.locator("#contact").scrollIntoViewIfNeeded();

  const submit = page.getByRole("button", { name: "Send Message" });
  await expect(submit).toBeVisible();

  return submit;
};

test.describe("contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads only when scrolled into view", async ({ page }) => {
    // At the top of the page the form is not rendered yet (lazy loaded)
    await expect(page.getByRole("button", { name: "Send Message" })).toHaveCount(0);

    await openContactForm(page);
  });

  test("an empty submit shows the email and message errors", async ({ page }) => {
    const submit = await openContactForm(page);

    await submit.click();

    await expect(page.getByText(emailError)).toBeVisible();
    await expect(page.getByText(messageError)).toBeVisible();
  });

  test("an invalid email shows only the email error", async ({ page }) => {
    const submit = await openContactForm(page);

    // getByRole, not getByLabel: the "Email" icon link (mailto) has the same accessible name
    await page.getByRole("textbox", { name: "Email" }).fill("jane@example");
    await page.getByRole("textbox", { name: "Message" }).fill("Hello, I need a website.");
    await submit.click();

    await expect(page.getByText(emailError)).toBeVisible();
    await expect(page.getByText(messageError)).toHaveCount(0);
  });
});
