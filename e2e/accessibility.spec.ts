import { AxeBuilder } from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

// Automated WCAG 2.x A/AA checks on the rendered page (contrast, names, labels, ARIA...).
// They catch roughly a third of accessibility issues; keyboard and focus are covered in the other specs.

// Waits until every finite animation (fade-ins, layout transitions) has finished.
// Mid-fade text has lower contrast than the final design, so checking too early gives false failures.
// Infinite animations (pulses, loops) are ignored, they would never finish.
const waitForAnimationsToFinish = async (page: Page) => {
  await expect(async () => {
    const running = await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter(
            (animation) =>
              animation.playState === "running" &&
              animation.effect?.getTiming().iterations !== Infinity
          ).length
    );
    expect(running).toBe(0);
  }).toPass();
};

// Runs axe on the current state of the page and fails with a readable list of violations
const expectNoViolations = async (page: Page) => {
  await waitForAnimationsToFinish(page);

  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  // One line per rule and element, so the failure says what to fix and where
  const report = violations.flatMap((violation) =>
    violation.nodes.map((node) => `${violation.id} (${violation.impact}): ${node.target.join(" ")}`)
  );

  expect(report).toEqual([]);
};

// Scrolls down in steps, so every lazy-loaded section (testimonials, globe, contact form) renders
const scrollThroughPage = async (page: Page) => {
  await expect(async () => {
    await page.mouse.wheel(0, 800);
    const atBottom = await page.evaluate(
      () => window.innerHeight + window.scrollY >= document.body.scrollHeight - 1
    );
    expect(atBottom).toBe(true);
  }).toPass();

  await expect(page.getByRole("button", { name: "Send Message" })).toBeVisible();
};

test.describe("accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("the page has no violations on load", async ({ page }) => {
    await expectNoViolations(page);
  });

  test("the page has no violations once every section has loaded", async ({ page }) => {
    await scrollThroughPage(page);

    await expectNoViolations(page);
  });

  test("an open project modal has no violations", async ({ page }) => {
    await page.getByRole("button", { name: /^RankinWorld/ }).click();
    await expect(page.getByRole("dialog", { name: /RankinWorld/ })).toBeVisible();

    await expectNoViolations(page);
  });

  test("the contact form showing errors has no violations", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();

    await expectNoViolations(page);
  });
});
