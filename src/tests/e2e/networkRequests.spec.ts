import { test } from "../../fixtures/home.fixture";
import { expect } from "@playwright/test";

test.describe('Network Validation', () => {
  test('should get valid request responses for homepage', async ({ homePage }) => {
    const failedRequests = [];
    const targetDomain = 'lanacion.com.ar';
    
    homePage.page.on('response', response => {
      const url = response.url();
      const status = response.status();
      
      if (url.includes(targetDomain) && !/^2/.test(status.toString())) {
        failedRequests.push({
          url: url,
          status: status,
          method: response.request().method(),
          resource: response.request().resourceType()
        });
      }
    });
    await homePage.page.waitForTimeout(2000);

    if (failedRequests.length > 0) {
      const errorDetails = failedRequests.map(r => 
        `- ${r.status} ${r.method} ${r.resource}: ${r.url}`
      ).join('\n');
      
      throw new Error(`Failed LA NACION requests:\n${errorDetails}`);
    }
    expect(failedRequests, 'All requests should return 200 status').toHaveLength(0);
  });
});