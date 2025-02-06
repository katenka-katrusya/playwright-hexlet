import { test, expect } from '@playwright/test';
import { fillByLabel, userData } from '../../utils.js';
import { request } from 'http';

test.beforeEach(async ({ page }) => {
  await request.post('/api/reset');
  await page.goto('/');

  // sign up
  await page.getByRole('button', { name: 'Войти' }).click();
  await page.getByRole('link', { name: 'Регистрация' }).click();
  await fillByLabel(page, 'Логин пользователя', userData.username);
  await fillByLabel(page, `${/^Пароль$/}`, userData.password);
  await fillByLabel(page, 'Подтвердите пароль', userData.password);
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
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
