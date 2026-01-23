// src/core/contexts/AppConfigProvider.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { AppConfigContext } from './AppConfigContext'; // 위에서 만든 Context import
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
      if (!tenantId) {
        if (mounted) {
          setError(new Error('[AppConfig] Tenant ID is missing in URL.'));
          setIsLoading(false);
        }
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const loaded = await loadTenantConfig(tenantId);
        if (mounted) setConfig(loaded);
      } catch (e) {
        if (mounted) {
          setError(e as Error);
          setConfig(null);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [tenantId]);

  const value = useMemo(
    () => ({
      tenantId: tenantId || '',
      config,
      isLoading,
      error,
    }),
    [tenantId, config, isLoading, error],
  );

  return <AppConfigContext.Provider value={value}>{children}</AppConfigContext.Provider>;
}
