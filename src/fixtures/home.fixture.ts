import { HomePage } from'../pages/homePage';
import { test as base } from "@playwright/test";

type HomeFixture = {
  homePage: HomePage;
};

export const test = base.extend<HomeFixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  page: async ({ page }, use) => {
    try {
      if (!page.isClosed()) {
        await page.goto("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.warn("Warning: page.goto('/') failed in fixture:", error.message);
      } else {
        console.warn("Warning: page.goto('/') failed in fixture with an unknown error.");
      }
    }

    await use(page);
  },
});
