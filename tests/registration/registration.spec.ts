import { test, expect } from '@playwright/test';
import { CONFIG } from '../../src/config';

test.beforeEach(async ({ page }) => {
  await page.goto(`${CONFIG.baseUrl}/auth/signup`);
});

test('has title', async ({ page }) => {
  await expect(page.getByTestId('title')).toContainText('Sign Up');
});

test('input incorrect username', async ({ page }) => {
  await page.getByTestId('username').type('short');
  await page.getByTestId('email').click();
  await expect(page.getByTestId('username-errors')).toContainText('Minimal length is 6 symbols');
});

test('input correct username', async ({ page }) => {
  await page.getByTestId('username').type('testUser');
  await page.getByTestId('email').click();
  await expect(page.getByTestId('username-errors')).not.toContainText('Minimal length is 6 symbols');
});

test('input incorrect email', async ({ page }) => {
  await page.getByTestId('email').type('test');
  await page.getByTestId('password').click();
  await expect(page.getByTestId('email-errors')).toContainText('Email is incorrect');
});

test('input correct email', async ({ page }) => {
  await page.getByTestId('email').type('test@gmail.com');
  await page.getByTestId('password').click();
  await expect(page.getByTestId('email-errors')).not.toContainText('Email is incorrect');
});

test('input incorrect password', async ({ page }) => {
  await page.getByTestId('password').type('11');
  await page.getByTestId('email').click();
  await expect(page.getByTestId('password-errors')).toContainText('Minimal length is 6 symbols');
});

test('input correct password', async ({ page }) => {
  await page.getByTestId('password').type('111111');
  await page.getByTestId('email').click();
  await expect(page.getByTestId('password-errors')).not.toContainText('Minimal length is 6 symbols');
});

test('input different passwords', async ({ page }) => {
  await page.getByTestId('password').type('111111');
  await page.getByTestId('repass').type('111112');
  await expect(page.getByTestId('repass-errors')).toContainText('Passwords don\'t match');
});

test('input the same passwords', async ({ page }) => {
  await page.getByTestId('password').type('111111');
  await page.getByTestId('repass').type('111111');
  await expect(page.getByTestId('repass-errors')).not.toContainText('Passwords don\'t match');
});

test('button is disabled if any of fields is empty', async ({ page }) => {
  await expect(page.getByTestId('signup')).toBeDisabled();

  await page.getByTestId('username').type('testUser');
  await expect(page.getByTestId('signup')).toBeDisabled();

  await page.getByTestId('email').type('test@gmail.com');
  await expect(page.getByTestId('signup')).toBeDisabled();

  await page.getByTestId('password').type('111111');
  await expect(page.getByTestId('signup')).toBeDisabled();

  await page.getByTestId('repass').type('111111');
  await expect(page.getByTestId('signup')).toBeEnabled();
});

test('button is disabled if username is incorrect', async ({ page }) => {
  await page.getByTestId('username').type('test');
  await page.getByTestId('email').type('test@gmail.com');
  await page.getByTestId('password').type('111111');
  await page.getByTestId('repass').type('111111');

  await expect(page.getByTestId('signup')).toBeDisabled();
});

test('button is disabled if email is incorrect', async ({ page }) => {
  await page.getByTestId('username').type('testUser');
  await page.getByTestId('email').type('test@gmail');
  await page.getByTestId('password').type('111111');
  await page.getByTestId('repass').type('111111');

  await expect(page.getByTestId('signup')).toBeDisabled();
});

test('button is disabled if password is incorrect', async ({ page }) => {
  await page.getByTestId('username').type('testUser');
  await page.getByTestId('email').type('test@gmail.com');
  await page.getByTestId('password').type('1111');
  await page.getByTestId('repass').type('111111');

  await expect(page.getByTestId('signup')).toBeDisabled();
});

test('button is disabled if passwords don\'t match', async ({ page }) => {
  await page.getByTestId('username').type('testUser');
  await page.getByTestId('email').type('test@gmail.com');
  await page.getByTestId('password').type('111111');
  await page.getByTestId('repass').type('222222');

  await expect(page.getByTestId('signup')).toBeDisabled();
});

test('display error for non-unique username', async ({ page }) => {
  await page.getByTestId('username').type(`testUser`);
  await page.getByTestId('email').type(`test${Math.random()}@gmail.com`);
  await page.getByTestId('password').type('111111');
  await page.getByTestId('repass').type('111111');

  await page.getByTestId('signup').click();
  await expect(page.getByText('Failed! Username is already in use!')).toBeVisible();
});

test('display error for non-unique email', async ({ page }) => {
  await page.getByTestId('username').type(`testUser${Math.random()}@gmail.com`);
  await page.getByTestId('email').type(`test@gmail.com`);
  await page.getByTestId('password').type('111111');
  await page.getByTestId('repass').type('111111');

  await page.getByTestId('signup').click();
  await expect(page.getByText('Failed! Email is already in use!')).toBeVisible();
});

test('navigate to login page after success registration', async ({ page }) => {
  await page.getByTestId('username').type(`testUser${Math.random()}`);
  await page.getByTestId('email').type(`test${Math.random()}@gmail.com`);
  await page.getByTestId('password').type('111111');
  await page.getByTestId('repass').type('111111');

  await page.getByTestId('signup').click();
  await expect(page).toHaveURL(`${CONFIG.baseUrl}/auth/signin`);
});
