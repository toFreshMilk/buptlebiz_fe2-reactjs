import { test, expect } from '@playwright/test';

test.describe('OnlyOffice Editor Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://demo.localhost:3200/ko/login');
    await page.evaluate(() => {
      localStorage.setItem('auth_token', 'demo-jwt-token-999');
      localStorage.setItem('auth_user', JSON.stringify({id: 'demo-user-01', name: 'Demo Admin'}));
    });
  });

  test('demo / ko renders OnlyOffice editor with 800px height', async ({ page }) => {
    await page.goto('http://demo.localhost:3200/ko/contract/1');

    // 1. Verify page load
    await expect(page.getByText('기본정보').first()).toBeVisible({ timeout: 15000 });
    
    // 2. Verify OnlyOffice section exists
    const section = page.locator('section', { hasText: '계약서 본문' });
    await expect(section).toBeVisible();

    // 3. Find any div that has a style height of 800px within that section
    // In OnlyofficeEditor.tsx, the outermost div has style={{ height }}
    const editorContainer = section.locator('div[style*="height: 800px"]');
    await expect(editorContainer).toBeVisible({ timeout: 15000 });
  });
});
