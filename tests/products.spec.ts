import { test, expect } from '@playwright/test';

// В данном упражнении вам необходимо протестировать список продуктов. В веб доступе вы можете посмотреть его работающую версию.
// При добавлении нового продукта в список он сначала отправляется в базу данных, а уже потом новым запросом подтягивается в интерфейс. Если при получении продуктов с бэкенда прилетает ошибка, то вместо списка продуктов отображается сообщение об ошибке (Failed to fetch).
// Задача
// Вам необходимо протестировать два варианта поведения приложения - успешное (товары возвращаются и отображаются на странице) и неуспешное (вместо товаров отображается сообщение об ошибке). Используйте адрес '/' для перехода на страницу с приложением.

const mainPageUrl =
  'https://web-js-playwright-mocking-8770066.evaluator2-8.hexlet.io/?';

// BEGIN (write your solution here)
test.describe.serial('Products Page', () => {
  test('should display list of products', async ({ page }) => {
    await page.route(`${mainPageUrl}api/products`, async (route) => {
      console.log('Mock API called!'); // Проверка работы мока
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: 'Product 1', price: 100 },
          { id: 2, name: 'Product 2', price: 200 },
        ]),
      });
    });

    await page.goto(mainPageUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#products-list li'); // Ждать рендер списка

    const productNames = await page.getByRole('listitem').allTextContents();
    expect(productNames).toEqual(['Product 1 - $100', 'Product 2 - $200']);
    await page.unroute(`${mainPageUrl}api/products`);
  });

  test('should display error message on 404', async ({ page }) => {
    await page.route(`**/api/products`, (route) => {
      console.log('MOCK 404 TRIGGERED');
      route.fulfill({ status: 404 });
    });

    await page.goto(mainPageUrl, { waitUntil: 'domcontentloaded' });

    // Ждем появления ошибки
    await page.waitForSelector('text=Failed to fetch');

    const errorMessage = page.getByText('Failed to fetch');
    await expect(errorMessage).toBeVisible();

    await page.unroute(`${mainPageUrl}api/products`);
  });
});

// END
