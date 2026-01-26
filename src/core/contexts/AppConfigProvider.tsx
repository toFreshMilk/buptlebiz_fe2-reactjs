// src/core/contexts/AppConfigProvider.tsx
import React, { useEffect, useState } from 'react';
import { AppConfigContext } from './AppConfigContext';
import { loadTenantConfig } from '@/core/config/tenant.config';
import { useTenant } from '@/core/hooks/useTenant';
import type { TenantConfig } from '@/core/config/tenant.types';

export function AppConfigProvider({ children }: { children: React.ReactNode }) {
  const { tenantId } = useTenant();
  const [config, setConfig] = useState<TenantConfig | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        setIsLoading(true);
        setError(null);

        const loaded = await loadTenantConfig(tenantId);

        if (mounted) {
          setConfig(loaded);
        }
      } catch (e) {
        if (mounted) {
          setError(e as Error);
          setConfig(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    run();

    return () => {
      mounted = false;
    };
  }, [tenantId]);

  // [React 19] useMemo 제거: 컴파일러가 자동으로 최적화함
  const value = {
    tenantId: tenantId || '',
    config,
    isLoading,
    error,
  };

  // [React 19] <Context.Provider> 대신 <Context> 바로 사용 가능
  return <AppConfigContext value={value}>{children}</AppConfigContext>;
}
