// src/core/contexts/AppConfigContext.ts
import { createContext } from 'react';
import type { TenantConfig } from '@/core/config/tenant.types';

export type AppConfigContextValue = {
  tenantId: string;
  config: TenantConfig | null;
  isLoading: boolean;
  error: Error | null;
};

export const AppConfigContext = createContext<AppConfigContextValue | null>(null);
