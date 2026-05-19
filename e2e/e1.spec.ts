import { test, expect } from '@playwright/test';

const TENANTS = ['demo', 'apr'];
const LANGUAGES = ['ko', 'en'];

test.describe('e1 (Custom E2E Suite)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://demo.localhost:3200/ko/login');
    await page.evaluate(() => {
      localStorage.setItem('auth_token', 'demo-jwt-token-999');
      localStorage.setItem('auth_user', JSON.stringify({id: 'demo-user-01', name: 'Demo Admin'}));
    });
  });

  for (const tenant of TENANTS) {
    for (const lang of LANGUAGES) {
      test(`[${tenant}] / [${lang}] - Contract page rendering, row click, and language switch`, async ({ page }) => {
        // 1. 계약 페이지 렌더링 잘되는지
        await page.goto(`http://${tenant}.localhost:3200/${lang}/contract`);
        await page.waitForLoadState('networkidle');

        // 테넌트 및 언어별 계약 메인 페이지 타이틀 확인
        if (tenant === 'demo' && lang === 'ko') {
          await expect(page.locator('h1', { hasText: '계약' })).toBeVisible();
        } else if (tenant === 'demo' && lang === 'en') {
          await expect(page.locator('h1', { hasText: 'Contracts' })).toBeVisible();
        } else if (tenant === 'apr' && lang === 'ko') {
          await expect(page.locator('h1', { hasText: '🚀 [APR] 계약 워크보드' })).toBeVisible();
        } else if (tenant === 'apr' && lang === 'en') {
          await expect(page.locator('h1', { hasText: '🚀 [APR] Contract Workboard' })).toBeVisible();
        }

        // 2. 리스트 중 1개 클릭했을 때 잘 이동해서 렌더링되는지
        // DataTable의 첫 번째 행 내부의 상세 버튼이나 행 자체 클릭
        // UI가 로드될 때까지 기다림
        const tableClass = tenant === 'apr' ? '.ui-apr-main-table' : '.ui-standard-main-table';
        const firstRow = page.locator(`${tableClass} tbody tr`).first();
        await expect(firstRow).toBeVisible();
        
        await firstRow.click();
        
        // 상세 페이지로 잘 이동했는지 URL 확인
        await expect(page).toHaveURL(new RegExp(`http://${tenant}.localhost:3200/${lang}/contract/.*`));
        await page.waitForLoadState('networkidle');
        
        // 상세 페이지 렌더링 확인 (뒤로가기 버튼)
        const backBtnClass = tenant === 'apr' ? '.ui-apr-detail-top-back' : '.ui-standard-detail-top-back';
        await expect(page.locator(backBtnClass)).toBeVisible();

        // 3. 언어 변경했을 때 잘 바뀌는지
        // 상세 페이지의 언어 스위처 셀렉트 박스 활용
        const langSwitcher = page.locator('select').first();
        await expect(langSwitcher).toBeVisible();

        const nextLang = lang === 'ko' ? 'en' : 'ko';
        
        // select option 변경
        await langSwitcher.selectOption(nextLang);
        
        // URL이 변경되었는지 확인
        await expect(page).toHaveURL(new RegExp(`http://${tenant}.localhost:3200/${nextLang}/contract/.*`));
        
        // 변경된 언어로 셀렉트 박스의 값이 일치하는지 검증
        await expect(langSwitcher).toHaveValue(nextLang);
        
        // 변경된 언어로 컴포넌트 내용이 바뀌었는지 간단히 확인
        // Back 버튼의 텍스트가 ko -> en 이면 'Back to list', en -> ko 면 '목록으로 돌아가기'로 바뀌어야 함.
        if (nextLang === 'ko') {
          await expect(page.locator(backBtnClass)).toContainText('목록');
        } else {
          await expect(page.locator(backBtnClass)).toContainText('Back');
        }
      });
    }
  }
});
