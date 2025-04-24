import { expect, type Locator, type Page } from "@playwright/test";

export class ArticlePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly footer: Locator;
  readonly footerLinks: Locator;
  readonly tittle: Locator;
  readonly subTittle: Locator;
  readonly articleBody: Locator;
  readonly paragraph: Locator;

  constructor(page: Page, private articlePath: string) {
    this.page = page;
    this.logo = page.locator('a.logo-header');
    this.footer = page.locator('div.footer-container');
    this.footerLinks = this.footer.locator('a');
    this.tittle = page.locator('main h1');
    this.subTittle = page.locator('main h2');
    this.articleBody = page.locator('section.cuerpo__nota');
    this.paragraph = this.articleBody.locator('p.com-paragraph');
  }

  async navigateToArticle() {
    await this.page.goto(this.articlePath);
    await this.page.waitForTimeout(2000);
  }
  
  async verifyArticleTitle() {
    const title = await this.tittle.textContent();
    expect(title).toBeTruthy();
    expect(title!.length).toBeGreaterThan(10);
    return title;
  }

  async verifyArticleHasVisibleParagraphs() {
    const firstParagraph = this.paragraph.first()
    
    await expect(this.articleBody).toBeVisible();
    await expect(firstParagraph).toBeVisible();

    const firstParagraphText = await firstParagraph.textContent();
    expect(firstParagraphText?.trim().length).toBeGreaterThan(0);
  }

  async verifyHeader() {
    await expect(this.logo).toBeVisible();
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
}