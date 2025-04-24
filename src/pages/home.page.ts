import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from './base.page';


export class HomePage extends BasePage {
  readonly firstArticle: Locator;
  readonly firstArticleTitle: Locator;
  readonly firstArticleLink: Locator;

  constructor(page: Page) {
    super(page);
    this.firstArticle = page.locator('article.ln-card').first();
    this.firstArticleTitle = this.firstArticle.locator('h1.title');
    this.firstArticleLink = this.firstArticle.locator('a.ln-link');
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForTimeout(2000);
  }

  async verifyFirstArticle() {
    await expect(this.firstArticle).toBeVisible();
    
    await expect(this.firstArticleTitle).toBeVisible();
    const titleText = await this.firstArticleTitle.textContent();
    expect(titleText!.trim()).toBeTruthy();
    
    const href = await this.firstArticleLink.getAttribute('href');
    expect(href).toMatch(/^\/.+\/.+-nid\d+\/$/); // Matches LA NACION URL pattern
  }

  async getFirstArticleTitle() {
    return await this.firstArticleTitle.textContent();
  }
}
