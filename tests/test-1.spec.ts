import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // Выбираем инпут с которым будем работать
  // Возвращается не DOM элемент, а "локатор"
  const input = page.getByPlaceholder('What needs to be done?');

  // Заполняем и нажимаем Enter
  const taskName = 'Пройти курс на Хекслет';
  await input.fill(taskName);
  await input.press('Enter');

  // Проверяем, что задача появилась в списке задач
  const item = page.getByTestId('todo-title').filter({ hasText: taskName });
  await expect(item).toBeVisible();
});

test('Register positive', async ({ page }) => {
  await page.goto(
    'https://web-js-playwright-locators-8730460.evaluator5-8.hexlet.io/?username=admin&password=qwerty&confirmPassword=qwerty&confirm=on'
  );

  const username = page.getByLabel('Имя пользователя');
  await username.fill('admin');
  const password = page.getByLabel('Пароль');
  const textPassword = 'qwerty';
  await password.fill(textPassword);
  const confirmPassword = page.getByLabel('Подтверждение пароля');
  await confirmPassword.fill(textPassword);
  const checkbox = page.getByRole('checkbox', {
    name: 'Даю согласие на обработку персональных данных',
  });
  await checkbox.check();
  const submit = page.getByRole('button', { name: 'Зарегистрироваться' });
  await submit.click();

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
  await expect(confirmPassword).toBeVisible();
  await expect(checkbox).toBeVisible();
  await expect(submit).toBeEnabled();
});
