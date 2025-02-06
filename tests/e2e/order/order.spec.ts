import { test, expect } from '@playwright/test';
import { fillByLabel, userData } from '../../utils.js';

test.beforeEach(async ({ page }) => {
  await page.goto(
    'https://web-js-playwright-test-structure-8751116.evaluator1-8.hexlet.io/?',
    { waitUntil: 'domcontentloaded' }
  );

  // sign in
  await page.getByRole('button', { name: 'Войти' }).click();
  await fillByLabel(page, 'Ваш логин', userData.username);
  await fillByLabel(page, 'Пароль', userData.password);
  await page.getByRole('button', { name: 'Отправить' }).click();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

// BEGIN (write your solution here)
test('Success order 1', async ({ page }) => {
  const item = { name: 'Автомобиль', price: 999999 };
  await page
    .getByRole('row')
    .filter({ hasText: item.name })
    .getByRole('button', { name: 'Заказать' })
    .click();
  await page.getByRole('button', { name: 'Оформить заказ' }).click();
  await page.getByRole('button', { name: 'Заказы' }).click();
  await page
    .getByRole('row')
    .filter({ hasText: item.price.toString() })
    .getByRole('button', { name: 'Подробнее' })
    .click();
  const row = page.getByRole('row', { name: 'Автомобиль 999999' });
  await expect(row).toBeVisible();
});

test('Success order 2', async ({ page }) => {
  const item = { name: 'Компьютер', price: 25000, count: 2 };
  await page
    .getByRole('row')
    .filter({ hasText: item.name })
    .getByRole('button', { name: 'Заказать' })
    .click();
  await fillByLabel(page, 'Какое количество вы хотите добавить?', 2);
  await page.getByRole('button', { name: 'Оформить заказ' }).click();
  await page.getByRole('button', { name: 'Заказы' }).click();
  await page
    .getByRole('row')
    .filter({ hasText: `${item.price} * ${item.count}` })
    .getByRole('button', { name: 'Подробнее' })
    .click();
  const row = page.getByRole('row', { name: `${item.name} ${item.price}` });
  await expect(row).toBeVisible();
});
// END
