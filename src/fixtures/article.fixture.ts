import { test as base, expect } from './home.fixture';
import { ArticlePage } from '../pages/article.page';

type ArticleFixtureOptions = {
    articlePath: string;
  };

export const test = base.extend<{
  articlePage: ArticlePage;
  articleOptions: ArticleFixtureOptions;
}>({
  articleOptions: [{
    articlePath: '/sociedad/1870-nid2311545/' // default article
  }, { option: true }],
  
  articlePage: async ({ page, articleOptions }, use) => {
    const articlePage = new ArticlePage(page, articleOptions.articlePath);
    await articlePage.navigateToArticle();
    await use(articlePage);
  },
});

export default test;

export { expect };