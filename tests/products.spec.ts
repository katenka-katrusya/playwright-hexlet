import { test, expect } from '@playwright/test';

const mainPageUrl = '/';

// BEGIN (write your solution here)
test.describe.serial('Products Page', () => {
  test('should display list of products', async ({ page }) => {
    await page.route('/api/products', (route) => {
      const json = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
      ];
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(json),
      });
    });

    await page.goto(mainPageUrl, {
      waitUntil: 'domcontentloaded',
    });

    const productNames = await page.getByRole('listitem').allTextContents();
    expect(productNames).toEqual(['Product 1 - $100', 'Product 2 - $200']);
    await page.unroute('/api/products');
  });

  test('should display error message on 404', async ({ page }) => {
    await page.route('/api/products', (route) => {
      route.fulfill({ status: 404 });
    });

    await page.goto(mainPageUrl, {
      waitUntil: 'domcontentloaded',
    });

    const errorMessage = page.getByText('Failed to fetch');
    await expect(errorMessage).toBeVisible();
    await page.unroute('/api/products');
  });
});
// END
