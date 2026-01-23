// src/core/hooks/useAppConfig.ts
import { useContext } from 'react';
import { AppConfigContext } from '@/core/contexts/AppConfigContext'; // .ts 파일에서 가져옴
import type { AppConfigContextValue } from '@/core/contexts/AppConfigContext';
import type { TenantConfig } from '@/core/config/tenant.types';

export function useAppConfig() {
  const ctx = useContext(AppConfigContext);
  if (!ctx) throw new Error('useAppConfig must be used within <AppConfigProvider />');
  if (ctx.error) throw ctx.error;
  return ctx as AppConfigContextValue & { config: TenantConfig };
}
