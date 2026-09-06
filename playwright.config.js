import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: { browserName: "chromium" },
  webServer: [
    {
      command: "pnpm --dir starter dev --host 127.0.0.1 --port 5178 --strictPort",
      url: "http://127.0.0.1:5178",
      reuseExistingServer: false,
    },
    {
      command: "pnpm --dir first-store dev --host 127.0.0.1 --port 5179 --strictPort",
      url: "http://127.0.0.1:5179",
      reuseExistingServer: false,
    },
  ],
});
