import { test, expect } from '@playwright/test';

test.describe('ContractMain', () => {
  test('demo / ko renders ContractMain', async ({ page }) => {
    await page.goto('http://demo.localhost:3200/ko/contract');
    // Use h1 and correct title from contract.json
    await expect(page.locator('h1', { hasText: '계약' })).toBeVisible();
  });

  test('demo / en renders ContractMain', async ({ page }) => {
    await page.goto('http://demo.localhost:3200/en/contract');
    await expect(page.locator('h1', { hasText: 'Contracts' })).toBeVisible();
  });

  test('apr / ko renders ContractMain', async ({ page }) => {
    await page.goto('http://apr.localhost:3200/ko/contract');
    await expect(page.locator('h1', { hasText: '🚀 [APR] 계약 워크보드' })).toBeVisible();
  });

  test('apr / en renders ContractMain', async ({ page }) => {
    await page.goto('http://apr.localhost:3200/en/contract');
    await expect(page.locator('h1', { hasText: '🚀 [APR] Contract Workboard' })).toBeVisible();
  });
});
