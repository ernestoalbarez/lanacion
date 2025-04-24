import { test, expect } from "../../fixtures/home.fixture";

test.describe('Network Validation', () => {
  test('should get valid request responses', async ({ collectFailedRequests }) => {
    expect(collectFailedRequests, 'All LANACION requests should succeed').toHaveLength(0);
  });
});