import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AppConfigContext } from './AppConfigContext';
import { loadTenantConfig } from '@/core/config/tenant.config';
import { useTenant } from '@/core/hooks/useTenant';

export function AppConfigProvider({ children }: { children: React.ReactNode }) {
  const { tenantId } = useTenant();

  const { data: config } = useSuspenseQuery({
    queryKey: ['app-config', tenantId],
    queryFn: () => loadTenantConfig(tenantId),
    staleTime: Infinity, // Config는 앱 실행 중 불변
    gcTime: Infinity,
  });

  // Context 값 구성
  const value = {
    tenantId,
    config, // 절대 null 아님
  };

  return <AppConfigContext value={value}>{children}</AppConfigContext>;
}
