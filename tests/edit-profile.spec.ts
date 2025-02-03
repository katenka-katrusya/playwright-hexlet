import { test, expect, Page } from '@playwright/test';

const selectors = {
  nameField: (page: Page) => page.getByRole('textbox', { name: 'Имя' }),
  birthdateField: (page: Page) =>
    page.getByRole('textbox', { name: 'Дата рождения' }),
  preferenceSelect: (page: Page) => page.getByLabel('Выберите предпочтение'),
  agreementCheckbox: (page: Page) =>
    page.getByRole('checkbox', { name: 'Согласие с условиями' }),
  saveButton: (page: Page) => page.getByRole('button', { name: 'Сохранить' }),
};

test.beforeEach(async ({ page }) => {
  await page.goto(
    'https://web-js-playwright-actions-8734662.evaluator3-8.hexlet.io/?'
  );
});

test('Display fields of profile editing form field', async ({ page }) => {
  await expect(selectors.nameField(page)).toBeVisible();
  await expect(selectors.birthdateField(page)).toBeVisible();
  await expect(selectors.preferenceSelect(page)).toBeVisible();
  await expect(selectors.agreementCheckbox(page)).toBeVisible();
  await expect(selectors.saveButton(page)).toBeVisible();
});

test('Correct filling of profile editing form fields', async ({ page }) => {
  await selectors.nameField(page).fill('Kate');
  await selectors.birthdateField(page).fill('2010-10-30');
  await selectors.preferenceSelect(page).selectOption('hexlet');
  await selectors.agreementCheckbox(page).check();
  await selectors.saveButton(page).click();
});

test('Reset the profile editing form after clicking the "Save" button', async ({
  page,
}) => {
  await expect(selectors.nameField(page)).toBeEmpty();
  await expect(selectors.birthdateField(page)).toBeEmpty();
  await expect(selectors.preferenceSelect(page)).toHaveValue('');
  await expect(selectors.agreementCheckbox(page)).not.toBeChecked();
});
