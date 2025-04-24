import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ArticlePage extends BasePage{
  readonly tittle: Locator;
  readonly subTittle: Locator;
  readonly articleBody: Locator;
  readonly paragraph: Locator;

  constructor(page: Page, private articlePath: string) {
    super(page);
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
}