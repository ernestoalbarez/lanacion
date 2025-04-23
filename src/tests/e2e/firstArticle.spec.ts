import { test } from "../../fixtures/home.fixture";
import { expect } from "@playwright/test";

test.describe('First Article Validation', () => {
    test('should be visible with valid title', async ({ homePage }) => {
      await homePage.verifyFirstArticle();
      
      // Optional: Print the title for debugging
      const title = await homePage.getFirstArticleTitle();
      console.log('First article title:', title);
    });
  
    test('should match expected pattern', async ({ homePage }) => {
      const title = await homePage.getFirstArticleTitle();
      
      const wordCount = title!.split(/\s+/).length;
      expect(wordCount).toBeGreaterThanOrEqual(5);
      
      // Should not be all uppercase
      expect(title).not.toMatch(/^[A-Z\s]+$/);
    });
  });