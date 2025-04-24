import { test } from "../../fixtures/article.fixture";

test.describe('LA NACION Article Page', () => {
  test.use({
    articleOptions: { 
      articlePath: '/politica/tras-la-caida-de-la-moratoria-la-oposicion-desafia-al-gobierno-impulsa-una-jubilacion-proporcional-a-nid25032025/'
    }
  });

  test('should display article title', async ({ articlePage }) => {
    await articlePage.verifyArticleTitle();
  });

  test('should have a paragraph visble', async ({ articlePage }) => {
    await articlePage.verifyArticleHasVisibleParagraphs();
  });

  test('should validate header', async({ articlePage }) => {
    await articlePage.verifyHeader();
  });

  test('should validate footer', async({ articlePage }) => {
    await articlePage.verifyFooter();
  });
});
