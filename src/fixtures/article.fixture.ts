import { test as base } from './home.fixture';
import { ArticlePage } from '../pages/article.page';
export { expect } from '@playwright/test';

type ArticleFixtureOptions = {
    articlePath: string;
  };

export const test = base.extend<{
  articleOptions: ArticleFixtureOptions;
  articlePage: ArticlePage;
}>({
  articleOptions: [{ articlePath: '/sociedad/1870-nid2311545/' }, { option: true }],
  
  articlePage: async ({ page, articleOptions }, use) => {
    const articlePage = new ArticlePage(page, articleOptions.articlePath);
    await articlePage.navigateToArticle();
    await use(articlePage);
  },
});

export default test;