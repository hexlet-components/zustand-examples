import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: { browserName: "chromium" },
  // vite зовётся напрямую, без `pnpm --dir … dev`: playwright по окончании
  // гасит запущенную им команду, а pnpm 12 сигнал дочернему vite не передаёт.
  // Сервер оставался жить с занятым портом, и прогон висел после зелёных тестов.
  webServer: [
    {
      command: "node_modules/.bin/vite --host 127.0.0.1 --port 5178 --strictPort",
      cwd: "starter",
      url: "http://127.0.0.1:5178",
      reuseExistingServer: false,
    },
    {
      command: "node_modules/.bin/vite --host 127.0.0.1 --port 5179 --strictPort",
      cwd: "first-store",
      url: "http://127.0.0.1:5179",
      reuseExistingServer: false,
    },
  ],
});
