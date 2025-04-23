import { test } from "../../fixtures/home.fixture";

test.describe('LA NACION Homepage', () => {
  test('should display header', async ({ homePage }) => {
    await homePage.verifyHeader();
  });

  test('should display footer', async ({ homePage }) => {
    await homePage.verifyFooter();
  });
});