// src/core/hooks/useTenantModule.ts
import { ComponentType } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getTenantComponent, getTenantService } from '@/core/config/tenant.config';
import { useAppConfig } from '@/core/contexts/AppConfigContext.ts';

/**
 * 테넌트 설정에 맞는 컴포넌트를 비동기로 로드합니다.
 * - Suspense 적용: 로딩 중에는 상위 Suspense Fallback이 표시됩니다.
 * - Non-Nullable: 반환된 Component는 항상 존재합니다.
 */
export function useTenantComponent<T = any>(componentKey: string) {
  const { tenantId } = useAppConfig();

  const { data: Component } = useSuspenseQuery({
    queryKey: ['tenant-component', tenantId, componentKey],
    queryFn: async () => {
      if (!tenantId) throw new Error('TenantID is required');
      return await getTenantComponent<ComponentType<T>>(tenantId, componentKey);
    },
    staleTime: Infinity, // 컴포넌트 코드는 런타임 중에 변하지 않음
    gcTime: 1000 * 60 * 5, // 언마운트 후 5분 뒤 메모리 해제
  });

  return { Component };
}

/**
 * 테넌트 설정에 맞는 서비스를 비동기로 로드합니다.
 * - Suspense 적용: 로딩 중에는 상위 Suspense Fallback이 표시됩니다.
 * - Non-Nullable: 반환된 service는 항상 존재합니다.
 */
export function useTenantService<T = any>(serviceKey: string): T {
  const { tenantId } = useAppConfig();

  const { data: service } = useSuspenseQuery({
    queryKey: ['tenant-service', tenantId, serviceKey],
    queryFn: async () => {
      if (!tenantId) throw new Error('TenantID is required');

      const serviceObj = await getTenantService<any>(tenantId, serviceKey);
      return serviceObj;
    },
    staleTime: Infinity, // 서비스 인스턴스는 런타임 중에 변하지 않음 (싱글톤 취급)
    gcTime: 1000 * 60 * 5, // 언마운트 후 5분 뒤 메모리 해제
  });

  return service as T;
}
