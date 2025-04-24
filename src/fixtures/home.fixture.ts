import { HomePage } from '../pages/homePage';
import { test as baseTest, expect } from "@playwright/test";

type FailedRequest = {
  url: string;
  status: number;
  method: string;
  resource: string;
};

type HomeFixture = {
  homePage: HomePage;
  collectFailedRequests: FailedRequest[];
};

export const test = baseTest.extend<HomeFixture>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await use(homePage);
  },

  collectFailedRequests: async ({ page }, use) => {
    const failedRequests: FailedRequest[] = [];
    const targetDomain = 'lanacion.com.ar';

    page.on('response', response => {
      const url = response.url();
      const status = response.status();
      
      if (url.includes(targetDomain) && !/^2/.test(status.toString())) {
        failedRequests.push({
          url,
          status,
          method: response.request().method(),
          resource: response.request().resourceType()
        });
      }
    });

    await use(failedRequests);
  },

  page: async ({ page }, use) => {
    await use(page);
  }
});

export { expect };