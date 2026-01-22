// src/core/contexts/AppConfigContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadTenantConfig } from '@/core/config/tenant.config';
import { useTenant } from '@/core/hooks/useTenant'; // { tenantId } 반환
import type { TenantConfig } from '@/core/config/tenant.types';

type AppConfigContextValue = {
    tenantId: string;
    config: TenantConfig | null; // 초기에는 null일 수 있음
    isLoading: boolean;
    error: Error | null;
};

// 기본값은 제거하거나, 에러 발생 전 임시 상태로만 사용
const AppConfigContext = createContext<AppConfigContextValue | null>(null);

export function AppConfigProvider({ children }: { children: React.ReactNode }) {
    // [수정 1] useTenant가 객체를 반환하므로 구조 분해 할당
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

                // [수정 2] tenantId가 없으면 에러 발생 (Demo 기본값 사용 X)
                if (!tenantId) {
                    throw new Error('[AppConfig] Tenant ID is missing in URL.');
                }

                // tenantId가 string임이 보장됨
                const loaded = await loadTenantConfig(tenantId);

                if (mounted) {
                    setConfig(loaded);
                }
            } catch (e) {
                if (mounted) {
                    setError(e as Error);
                    setConfig(null); // 에러 시 설정 비움
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

    const value = useMemo<AppConfigContextValue>(() => {
        return {
            // tenantId가 없으면 빈 문자열 (에러 상태일 것임)
            tenantId: tenantId || '',
            config,
            isLoading,
            error,
        };
    }, [tenantId, config, isLoading, error]);

    return <AppConfigContext.Provider value={value}>{children}</AppConfigContext.Provider>;
}

export function useAppConfig() {
    const ctx = useContext(AppConfigContext);
    if (!ctx) {
        throw new Error('useAppConfig must be used within <AppConfigProvider />');
    }

    // [옵션] 훅 사용 시점에서 에러가 있으면 바로 throw (Error Boundary로 전파)
    if (ctx.error) {
        throw ctx.error;
    }

    // 로딩 중이 아니고 config도 없으면 비정상 상태 (에러 throw 가능)
    if (!ctx.isLoading && !ctx.config) {
        throw new Error('[AppConfig] Config failed to load.');
    }

    // 타입 단언: 여기를 통과하면 config는 존재함
    return ctx as AppConfigContextValue & { config: TenantConfig };
}
