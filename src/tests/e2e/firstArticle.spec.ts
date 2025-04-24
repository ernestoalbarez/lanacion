import { test, expect } from "../../fixtures/home.fixture";

test.describe('First Article Validation', () => {
  test('should be visible with valid title', async ({ homePage }) => {
    await homePage.verifyFirstArticle();
  });

  test('should match expected pattern', async ({ homePage }) => {
    const title = await homePage.getFirstArticleTitle();
    const wordCount = title!.split(/\s+/).length;
    expect(wordCount).toBeGreaterThanOrEqual(5);
    expect(title).not.toMatch(/^[A-Z\s]+$/);
  });
});