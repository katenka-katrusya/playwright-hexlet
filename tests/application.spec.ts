import { test, expect, Page } from '@playwright/test';

const userData = {
  username: 'username',
  password: 'password',
};

const wrongUserData = {
  username: '1',
  password: '2',
  passwordConfirm: '3',
};

test.beforeEach(async ({ page }) => {
  await page.goto(
    'https://web-js-playwright-screenshot-testing-8745203.evaluator4-8.hexlet.io/?'
  );
  // await page.goto('http://localhost:8080');
});

const fillByLabel = async (page: Page, labelText: string, value: string) => {
  const input = page.getByLabel(labelText);
  await input.fill(value);
};

test('Register positive', async ({ page }) => {
  // BEGIN (write your solution here)
  await fillByLabel(page, 'Имя пользователя', userData.username);
  await fillByLabel(page, 'Пароль', userData.password);
  await fillByLabel(page, 'Подтверждение пароля', userData.password);

  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

  const successMessage = page.getByText(
    `Добро пожаловать, ${userData.username}`
  );
  await expect(successMessage).toBeVisible();
  await expect(page).toHaveScreenshot();
  // END
});

test('Register negative', async ({ page }) => {
  // BEGIN (write your solution here)
  await fillByLabel(page, 'Имя пользователя', wrongUserData.username);
  await fillByLabel(page, 'Пароль', wrongUserData.password);
  await fillByLabel(
    page,
    'Подтверждение пароля',
    wrongUserData.passwordConfirm
  );

  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

  // Проверка, что ошибки появились
  await fillByLabel(page, 'Имя пользователя', wrongUserData.username);
  await fillByLabel(page, 'Пароль', wrongUserData.password);
  await fillByLabel(
    page,
    'Подтверждение пароля',
    wrongUserData.passwordConfirm
  );

  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

  await expect(page.locator('#usernameError')).toBeVisible();
  await expect(page.locator('#passwordError')).toBeVisible();
  await expect(page.locator('#confirmPasswordError')).toBeVisible();

  // скриншот всей формы с ошибками
  await expect(page).toHaveScreenshot();
  // END
});
