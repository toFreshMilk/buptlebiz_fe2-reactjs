// src/core/hooks/useTenantModule.ts
import { useState, useEffect, ComponentType } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { getTenantComponent, getTenantService } from '@/core/config/tenant.config';

/**
 * 테넌트 설정에 맞는 컴포넌트를 비동기로 로드합니다.
 */
export function useTenantComponent<T = any>(componentKey: string) {
    const { tenantId } = useAppConfig();
    const [Component, setComponent] = useState<ComponentType<T> | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!tenantId) return;

        let isMounted = true;
        getTenantComponent<ComponentType<T>>(tenantId, componentKey)
            .then((Comp) => {
                if (isMounted) setComponent(() => Comp);
            })
            .catch((err) => {
                if (isMounted) setError(err);
            });

        return () => { isMounted = false; };
    }, [tenantId, componentKey]);

    return { Component, error, isLoading: !Component && !error };
}

/**
 * 테넌트 설정에 맞는 서비스를 비동기로 로드하고 인스턴스화합니다.
 */
export function useTenantService<T = any>(serviceKey: string) {
    const { tenantId } = useAppConfig();
    const [service, setService] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!tenantId) return;

        let isMounted = true;

        // Service Class(Constructor)를 가져옵니다.
        getTenantService<T>(tenantId, serviceKey)
            .then((ServiceClass) => {
                if (isMounted) {
                    // [핵심] 여기서 인스턴스화(Instantiation) 수행
                    // tenantId를 생성자에 주입하여 서비스를 초기화합니다.
                    const instance = new ServiceClass(tenantId);
                    setService(instance);
                }
            })
            .catch((err) => {
                if (isMounted) setError(err);
            });

        return () => { isMounted = false; };
    }, [tenantId, serviceKey]);

    return { service, error, isLoading: !service && !error };
}
