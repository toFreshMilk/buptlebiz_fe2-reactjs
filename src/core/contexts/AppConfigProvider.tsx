// src/core/contexts/AppConfigProvider.tsx
import React, { useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AppConfigContext } from './AppConfigContext';
import { loadTenantConfig } from '@/core/config/tenant.config';
import { useTenant } from '@/core/hooks/useTenant';
import i18n from '@/core/i18n/i18n';

export function AppConfigProvider({ children }: { children: React.ReactNode }) {
  const { tenantId } = useTenant();

  const { data: config } = useSuspenseQuery({
    queryKey: ['app-config', tenantId],
    queryFn: () => loadTenantConfig(tenantId),
    staleTime: Infinity, // Config는 앱 실행 중 불변
    gcTime: Infinity,
  });

  useEffect(() => {
    if (config?.features?.defaultLang && i18n.language !== config.features.defaultLang) {
      i18n.changeLanguage(config.features.defaultLang);
    }
  }, [config?.features?.defaultLang]);

  // Context 값 구성
  const value = {
    tenantId,
    config, // 절대 null 아님
  };

  return <AppConfigContext value={value}>{children}</AppConfigContext>;
}
