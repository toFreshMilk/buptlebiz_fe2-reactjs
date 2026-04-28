import { test, expect } from '@playwright/test';

test.describe('ContractMain', () => {
  test('demo / ko renders ContractMain', async ({ page }) => {
    // Navigate to demo tenant, ko language, contract feature
    await page.goto('http://demo.localhost:3200/ko/contract');

    // Assert that the title text from ko/contract.json is present inside a button
    // "title": "표준 계약서 관리2222"
    await expect(page.locator('button', { hasText: '표준 계약서 관리2222' })).toBeVisible();
  });

  test('demo / en renders ContractMain', async ({ page }) => {
    // Navigate to demo tenant, en language, contract feature
    await page.goto('http://demo.localhost:3200/en/contract');

    // Assert that the title text from en/contract.json is present inside a button
    // "title": "standard contract management"
    await expect(page.locator('button', { hasText: 'standard contract management' })).toBeVisible();
  });

  test('apr / ko renders ContractMain', async ({ page }) => {
    // Navigate to apr tenant, ko language, contract feature
    await page.goto('http://apr.localhost:3200/ko/contract');

    // Assert that the title text from apr ko/contract.json is present inside a button
    // "title": "APR 전용 계약 솔루션1111dfdfsdfsd"
    await expect(page.locator('button', { hasText: 'APR 전용 계약 솔루션1111dfdfsdfsd' })).toBeVisible();
  });

  test('apr / en renders ContractMain', async ({ page }) => {
    // Navigate to apr tenant, en language, contract feature
    await page.goto('http://apr.localhost:3200/en/contract');

    // Assert that the title text from apr en/contract.json is present inside a button
    // "title": "APR only contract solution"
    await expect(page.locator('button', { hasText: 'APR only contract solution' })).toBeVisible();
  });
});
