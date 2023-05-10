import { test, expect } from '@playwright/test';
import { CONFIG } from '../src/config';
test.beforeAll(async () => {
  await fetch(`${CONFIG.apiUrl}/test/drop`, { method: 'post' });
});

test.beforeEach(async ({ page }) => {
  await page.goto(`${CONFIG.baseUrl}/auth/signin`);
});

test('has title', async ({ page }) => {
  await expect(page.getByTestId('title')).toContainText('Sign In');
});

test('buttons are disabled when username is empty', async ({ page }) => {
  await page.getByTestId('username').type('');
  await page.getByTestId('password').type('111111');
  await expect(page.getByTestId('signin')).toBeDisabled();
});

test('display error for wrong password', async ({ page }) => {
  await page.getByTestId('username').type('testUser');
  await page.getByTestId('password').type('222222');
  await page.getByTestId('signin').click();
  await expect(page.getByText('Invalid Password!')).toBeVisible();
});

test('display error for non-existing user', async ({ page }) => {
  await page.getByTestId('username').type('111111');
  await page.getByTestId('password').type('222222');
  await page.getByTestId('signin').click();
  await expect(page.getByText('User Not found.')).toBeVisible();
});

test('navigate to calendar page after success login', async ({ page }) => {
  await page.getByTestId('username').type(`testUser`);
  await page.getByTestId('password').type('111111');

  await page.getByTestId('signin').click();
  await expect(page).toHaveURL(`${CONFIG.baseUrl}/calendar`);
});
