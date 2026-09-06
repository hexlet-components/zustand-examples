import { expect, test } from "@playwright/test";

test("стартовое приложение загружается", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:5178");
  await expect(page.getByRole("heading", { name: "Примеры Zustand" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("компоненты счётчика работают с общим стором", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:5179");
  await expect(page.getByText("Нажали 0 раз", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Нажать", exact: true }).click();
  await page.getByRole("button", { name: "Нажать", exact: true }).click();
  await expect(page.getByText("Нажали 2 раз", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Сбросить" }).click();
  await expect(page.getByText("Нажали 0 раз", { exact: true })).toBeVisible();
  await page.evaluate(async () => {
    const { useAppStore } = await import("/src/store.js");
    useAppStore.getState().increment();
  });
  await expect(page.getByText("Нажали 1 раз", { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});
