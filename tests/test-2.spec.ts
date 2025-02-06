import { test, expect } from '@playwright/test';
import TodoMVCPage from '../models/TodoMVCPage';

test('adding a task', async ({ page }) => {
  const todoMvcPage = new TodoMVCPage(page);
  await todoMvcPage.goto();

  await todoMvcPage.addTodo('Hello Hexlet');
  await todoMvcPage.addTodo('Learning something new');

  await expect(todoMvcPage.getTaskItemByName('Hello Hexlet')).toBeVisible();
  await expect(
    todoMvcPage.getTaskItemByName('Learning something new')
  ).toBeVisible();
});
