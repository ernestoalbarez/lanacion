import { test, expect } from "../../fixtures/article.fixture";

test.describe('Article Page Network Validation', () => {
  test.use({
    articleOptions: { 
      articlePath: '/politica/tras-la-caida-de-la-moratoria-la-oposicion-desafia-al-gobierno-impulsa-una-jubilacion-proporcional-a-nid25032025/'
    }
  });

  test('should get valid request responses from article page', async ({ collectFailedRequests }) => {
    expect(collectFailedRequests, 'All LANACION article page requests should succeed').toHaveLength(0);
  });
});