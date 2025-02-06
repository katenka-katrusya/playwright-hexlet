import { Page, Locator } from '@playwright/test';

export default class TodoMVCPage {
  private page: Page;
  private inputForNewTodo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputForNewTodo = page.getByRole('textbox', {
      name: 'What needs to be done?',
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  }

  getTaskItemByName(taskName: string): Locator {
    return this.page.getByTestId('todo-title').filter({ hasText: taskName });
  }

  async addTodo(text: string): Promise<void> {
    await this.inputForNewTodo.fill(text);
    await this.inputForNewTodo.press('Enter');
  }
}
