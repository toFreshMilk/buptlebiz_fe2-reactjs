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
 * 테넌트 설정에 맞는 서비스를 비동기로 로드합니다.
 */
export function useTenantService<T = any>(serviceKey: string) {
    const { tenantId } = useAppConfig();
    const [service, setService] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!tenantId) return;

        let isMounted = true;
        getTenantService<T>(tenantId, serviceKey)
            .then((svc) => {
                if (isMounted) setService(svc);
            })
            .catch((err) => {
                if (isMounted) setError(err);
            });

        return () => { isMounted = false; };
    }, [tenantId, serviceKey]);

    return { service, error, isLoading: !service && !error };
}
