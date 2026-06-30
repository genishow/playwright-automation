import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').fill('geni');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('genishow@fmal.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('geni123');
  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByRole('radio', { name: 'Employed' }).check();
  await page.locator('input[name="bday"]').fill('1970-01-06');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('form-comp')).toContainText('× Success! The Form has been submitted successfully!.');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.getByRole('link', { name: 'iphone X' }).click();
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.getByRole('link', { name: 'Samsung Note' }).click();
});