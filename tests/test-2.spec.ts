import { test, expect } from '@playwright/test';

test('adding a task', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  const input = page.getByRole('textbox', { name: 'What needs to be done?' });
  await input.fill('Hello Hexlet');
  await input.press('Enter');
  await input.fill('Learning something new');
  await input.press('Enter');

  await expect(page.getByText('Hello Hexlet')).toBeVisible();
  await expect(page.getByText('Learning something new')).toBeVisible();
});
