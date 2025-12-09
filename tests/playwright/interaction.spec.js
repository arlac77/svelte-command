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
  await page.getByRole("button", { name: "Failing Command" }).click();

  await page.screenshot({
    path: "test-results/screenshots/command_failing.png"
  });
});
