import { test, expect } from '@playwright/test';

test.describe('ContractMainTabs', () => {
  // demo / ko
  test('demo / ko renders ContractMainTabs', async ({ page }) => {
    await page.goto('http://demo.localhost:3200/ko/contract');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.ui-standard-main-tab-all')).toBeVisible();
    await expect(page.locator('.ui-standard-main-tab-draft')).toBeVisible();
  });

  // demo / en
  test('demo / en renders ContractMainTabs', async ({ page }) => {
    await page.goto('http://demo.localhost:3200/en/contract');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.ui-standard-main-tab-all')).toBeVisible();
    await expect(page.locator('.ui-standard-main-tab-draft')).toBeVisible();
  });

  // apr / ko
  test('apr / ko renders ContractMainTabs', async ({ page }) => {
    await page.goto('http://apr.localhost:3200/ko/contract');
    await page.waitForLoadState('networkidle');
    // The locator was .ui-apr-contract-create but the button text is also unique
    await expect(page.locator('button', { hasText: '계약 생성' }).first()).toBeVisible();
  });
});