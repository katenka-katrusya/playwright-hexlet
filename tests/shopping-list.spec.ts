import { test, expect, Page } from '@playwright/test';

const selectors = {
  input: (page: Page) => page.locator('#item-input'),
  addItemButton: (page: Page) => page.locator('#add-item-button'),
};

test.beforeEach(async ({ page }) => {
  await page.goto(
    'https://web-js-playwright-assertions-8735422.evaluator5-8.hexlet.io/?'
  );
});

test('Checking the display of interface elements of the "Shopping List" page', async ({
  page,
}) => {
  await expect(
    page.getByRole('heading', { name: 'Shopping List' })
  ).toBeVisible();
  await expect(selectors.input(page)).toBeVisible();
  await expect(selectors.addItemButton(page)).toBeVisible();
});

test('Check if a product has been added to the list', async ({ page }) => {
  await selectors.input(page).fill('Milk');

  await selectors.addItemButton(page).click();

  await expect(page.locator('li', { hasText: 'Milk' })).toBeVisible();
});

test('Checking if a product has been removed from the list', async ({
  page,
}) => {
  await page.locator('#item-input').fill('Bread');
  await page.locator('#add-item-button').click();
  await expect(page.locator('li', { hasText: 'Bread' })).toBeVisible();

  await page
    .getByRole('listitem')
    .filter({ hasText: 'Bread' })
    .getByRole('button')
    .click();

  await expect(page.locator('li', { hasText: 'Bread' })).not.toBeVisible();
});
