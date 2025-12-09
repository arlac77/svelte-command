// @ts-check
import { test, expect } from "@playwright/test";

test("command", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("button", { name: "Long Running Command" }).click();

  await expect(page.locator("#commandExecuted")).toContainText("1");

  await page.screenshot({
    path: "test-results/screenshots/command_long_running.png"
  });
});

test("failing command", async ({ page }) => {
  const button = await page.getByRole("button", { name: "Failing Command" });
  expect(button.isVisible());

  /*
  await expect(page.locator("body")).toMatchAriaSnapshot(
    `- button "Failing Command"`
  );*/

  await page.screenshot({
    path: "test-results/screenshots/command_failing.png"
  });
});
