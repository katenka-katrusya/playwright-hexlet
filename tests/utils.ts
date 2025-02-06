import { Page } from '@playwright/test';

export const fillByLabel = async (
  page: Page,
  labelText: string,
  value: string | number
): Promise<void> => {
  const input = page.getByLabel(labelText);
  await input.fill(value.toString());
};

export const userData = {
  username: 'username',
  password: 'password',
};
