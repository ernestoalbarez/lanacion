import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly logoHeader: Locator;
  readonly logoLink: Locator;
  readonly logoSvg: Locator;
  readonly footer: Locator;
  readonly footerLinks: Locator;
  readonly firstArticle: Locator;
  readonly firstArticleTitle: Locator;
  readonly firstArticleLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoHeader = page.locator('.logo-header');
    this.logoLink = page.locator('.logo-header[title="Ir a la página principal"]');
    this.logoSvg = this.logoLink.locator('svg');
    this.footer = page.locator('.footer-container.--no-app');
    this.footerLinks = this.footer.locator('a');
    this.firstArticle = page.locator('article.ln-card').first();
    this.firstArticleTitle = this.firstArticle.locator('h1.title');
    this.firstArticleLink = this.firstArticle.locator('a.ln-link');
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  async verifyHeader() {
    await expect(this.logoLink).toBeVisible();
    await expect(this.logoSvg).toBeVisible();
    await expect(this.logoLink).toHaveAttribute('href', '/');
  }

  async verifyFooter() {
    await this.footer.scrollIntoViewIfNeeded();
    await expect(this.footer).toBeVisible();
    const linkCount = await this.footerLinks.count();
    expect(linkCount).toBeGreaterThan(5);
    
    await expect(this.footer.locator('p:has-text("Secciones")')).toBeVisible();
    await expect(this.footer.locator('p:has-text("Revistas")')).toBeVisible();
    await expect(this.footer.locator('p:has-text("Redes sociales:")')).toBeVisible();
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
