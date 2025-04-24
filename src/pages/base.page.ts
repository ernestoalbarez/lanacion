import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    protected readonly logo: Locator;
    protected readonly logoLink: Locator;
    protected readonly logoSvg: Locator;
    protected readonly footer: Locator;
    protected readonly footerLinks: Locator;
  
    constructor(protected readonly page: Page) {
    this.page = page;
    this.logo = this.page.locator('a.logo-header');
    this.logoLink = page.locator('.logo-header[title="Ir a la página principal"]');
    this.logoSvg = this.logoLink.locator('svg');
    this.footer = this.page.locator('footer.ln-footer-home');
    this.footerLinks = this.footer.locator('a');
}

async verifyHeader() {
    await expect(this.logo, 'Logo should be visible').toBeVisible();
    await expect(this.logoLink).toBeVisible();
    await expect(this.logoSvg).toBeVisible();
  }

  async verifyFooter() {
    await this.footer.scrollIntoViewIfNeeded();
    await expect(this.footer, 'Footer should be visible').toBeVisible();
    await expect(this.footer).toBeVisible();
    const linkCount = await this.footerLinks.count();
    expect(linkCount, 'Footer should contain at least 5 links').toBeGreaterThanOrEqual(5);
    
    await expect(this.footer.locator('p:has-text("Secciones")')).toBeVisible();
    await expect(this.footer.locator('p:has-text("Revistas")')).toBeVisible();
    await expect(this.footer.locator('p:has-text("Redes sociales:")')).toBeVisible();
  }

  async navigateToHomepage() {
    await this.logo.click();
    await expect(this.page).toHaveURL('https://www.lanacion.com.ar/');
  }
}