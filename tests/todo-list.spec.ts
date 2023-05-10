import { test, expect } from '@playwright/test';
import { CONFIG } from '../src/config';

test.describe("todo list", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${CONFIG.baseUrl}/auth/signin`);
    await page.getByTestId('username').type(`testUser`);
    await page.getByTestId('password').type('111111');

    await page.getByTestId('signin').click();

    await expect(page).toHaveURL(`${CONFIG.baseUrl}/calendar`);
  });

  test('display dialog after click on Add button', async ({ page }) => {
    await page.getByTestId('add-todo').click();
    await expect(page.getByTestId('note-dialog')).toBeVisible();
  });

  test('save button must be disabled if title is empty', async ({ page }) => {
    await page.getByTestId('add-todo').click();
    await expect(page.getByTestId('save')).toBeDisabled();
  });

  test('delete button must be disabled', async ({ page }) => {
    await page.getByTestId('add-todo').click();
    await expect(page.getByTestId('delete')).toBeDisabled();
  });

  test('creation and deletion must work correctly', async ({ page }) => {
    await page.getByTestId('add-todo').click();
    await page.getByTestId('title').type('test note');
    await page.getByTestId('save').click();
    await expect(page.getByTestId('note-dialog')).toBeHidden();
    await expect(page.getByTestId('todo-list')).toContainText('test note');
    await expect(page.getByTestId('note-dialog')).toBeHidden();

    await page.getByText('test note').click();
    await expect(page.getByTestId('delete')).toBeVisible();

    await page.getByTestId('delete').click();
    await expect(page.getByTestId('note-dialog')).toBeHidden();
    await expect(page.getByTestId('todo-list')).not.toContainText('test note');
  });

  test('editing must work correctly', async ({ page }) => {
    await page.getByTestId('add-todo').click();
    await page.getByTestId('title').type('note to edit');
    await page.getByTestId('save').click();
    await expect(page.getByTestId('note-dialog')).toBeHidden();

    await page.getByTestId('row 1').click();
    await page.getByTestId('title').type('edited note');
    await page.getByTestId('save').click();

    await expect(page.getByTestId('todo-list')).toContainText('edited note');
  });
});
