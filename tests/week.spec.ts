import { test, expect } from '@playwright/test';
import { CONFIG } from '../src/config';
import { formatToDateAndMonth } from '../src/app/helpers/formatter.util';

const testId = `${formatToDateAndMonth(new Date())} 0`;

test.beforeEach(async ({page}) => {
  await page.goto(`${CONFIG.baseUrl}/auth/signin`);
  await page.getByTestId('username').type(`testUser`);
  await page.getByTestId('password').type('111111');

  await page.getByTestId('signin').click();

  await expect(page).toHaveURL(`${CONFIG.baseUrl}/calendar`);
});

test('display dialog after click on empty row', async ({page}) => {
  await page.getByTestId(testId).click();
  await expect(page.getByTestId('note-dialog')).toBeVisible();
});

test('save button must be disabled if title is empty', async ({page}) => {
  await page.getByTestId(testId).click();
  await expect(page.getByTestId('save')).toBeDisabled();
});

test('delete button must be disabled', async ({page}) => {
  await page.getByTestId(testId).click();
  await expect(page.getByTestId('delete')).toBeDisabled();
});

test('creation and deletion must work correctly', async ({page}) => {
  await page.getByTestId(testId).click();
  await page.getByTestId('title').type('test week note');
  await page.getByTestId('save').click();
  await expect(page.getByTestId('note-dialog')).toBeHidden();
  await expect(page.getByTestId('calendar')).toContainText('test week note');
  await expect(page.getByTestId('note-dialog')).toBeHidden();

  await page.getByText('test week note').click();
  await expect(page.getByTestId('delete')).toBeVisible();

  await page.getByTestId('delete').click();
  await expect(page.getByTestId('note-dialog')).toBeHidden();
  await expect(page.getByTestId('calendar')).not.toContainText('test week note');
});

test('editing must work correctly', async ({page}) => {
  await page.getByTestId(testId).click();
  await page.getByTestId('title').type('week note to edit');
  await page.getByTestId('save').click();
  await expect(page.getByTestId('calendar')).toContainText('week note to edit');
  await expect(page.getByTestId('note-dialog')).toBeHidden();

  await page.getByText('week note to edit').click();
  await page.getByTestId('title').type('edited note');
  await page.getByTestId('save').click();

  await expect(page.getByTestId('calendar')).toContainText('edited note');
});
