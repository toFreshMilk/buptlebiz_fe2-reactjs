import { createContext, use } from 'react';
import type { TenantConfig } from '@/core/config/tenant.types';

// -----------------------------------------------------------------------------
// 1. Type Definitions
// -----------------------------------------------------------------------------
export type AppConfigContextValue = {
  tenantId: string;
  config: TenantConfig; // [변경] Suspense 사용 시 무조건 존재 (Non-Nullable)
};

// -----------------------------------------------------------------------------
// 2. Context Creation
// -----------------------------------------------------------------------------
// 초기값은 null이지만, Provider 안에서만 쓸 것이므로 Hook에서 Null Check 수행
export const AppConfigContext = createContext<AppConfigContextValue | null>(null);

// -----------------------------------------------------------------------------
// 3. Custom Hook (Consumer)
// -----------------------------------------------------------------------------
export function useAppConfig() {
  const context = use(AppConfigContext);

  if (!context) {
    throw new Error('useAppConfig는 <AppConfigProvider /> 내부에서 사용되어야 합니다.');
  }

  // Provider 바깥이면 위에서 에러가 나므로, 여기서는 무조건 값이 있음을 보장
  return context;
}
