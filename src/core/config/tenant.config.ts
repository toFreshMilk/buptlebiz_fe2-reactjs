// src/core/config/tenant.config.ts
import { ComponentType } from 'react';
import type { TenantConfig, ComponentLoader, ServiceLoader, ModuleWithDefault } from '@/core/config/tenant.types';

// === 1. Loaders ===
// 테넌트별 설정 파일(*.config.ts)을 비동기로 로드합니다.
export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
    const loaders: Record<string, () => Promise<ModuleWithDefault<TenantConfig>>> = {
        demo: () => import('@/core/config/tenants/demo.config'),
        apr: () => import('@/core/config/tenants/apr.config'),
    };

    const loader = loaders[tenantId];
    if (!loader) {
        throw new Error(`[Config Error] Unknown tenant: ${tenantId}`);
    }

    const moduleData = await loader();
    // 설정 파일 내에 id가 누락되었을 경우를 대비해 tenantId 강제 주입
    return { ...moduleData.default, id: tenantId };
}

// === 2. Component Loader ===
// 표준 컴포넌트 매핑
const StandardComponents: Record<string, ComponentLoader> = {
    TopNavbar: () => import('@/standard/shared/components/TopNavbar'),
    WorkspaceBanner: () => import('@/standard/shared/components/WorkspaceBanner'),
    ContractSidebar: () => import('@/standard/contract/components/ContractSidebar'),
    ContractMain: () => import('@/standard/contract/components/ContractMain'),
    ContractList: () => import('@/standard/contract/components/ContractList'),
    ContractDetailTop: () => import('@/standard/contract/components/ContractDetailTop'),
    ContractDetailLeft: () => import('@/standard/contract/components/ContractDetailLeft'),
    ContractDetailRight: () => import('@/standard/contract/components/ContractDetailRight'),
};

export async function getTenantComponent<T = ComponentType<any>>(
    tenantId: string,
    key: string,
): Promise<T> {
    // 1. 테넌트 설정 로드
    const config = await loadTenantConfig(tenantId);

    // 2. 테넌트 오버라이드 확인 -> 없으면 Standard 확인
    const loader = config.components?.[key] || StandardComponents[key];

    if (!loader) {
        console.error(`[Component Error] Component '${key}' not found for tenant '${tenantId}'`);
        throw new Error(`Component '${key}' not found`);
    }

    // 3. 모듈 로드 및 Default Export 반환
    const moduleData = await loader();
    return moduleData.default as T;
}

// === 3. Service Loader ===
const StandardServices: Record<string, ServiceLoader> = {
    ContractService: () => import('@/standard/contract/services/contract.service'),
};

/**
 * 서비스 클래스(Constructor)를 비동기로 로드하여 반환합니다.
 * 인스턴스화는 Hook에서 수행합니다.
 */
export async function getTenantService<T = any>(
    tenantId: string,
    key: string,
): Promise<{ new (tenantId: string): T }> {
    const config = await loadTenantConfig(tenantId);

    // 테넌트별 커스텀 서비스가 있는지 확인
    const tenantLoader = config.services?.[key];

    if (tenantLoader) {
        console.log(`[Service] Custom Loaded: ${tenantId}:${key}`);
        const moduleData = await tenantLoader();
        return moduleData.default as { new (tenantId: string): T };
    }

    // 없으면 표준 서비스 로드
    const standardLoader = StandardServices[key];
    if (!standardLoader) {
        throw new Error(`Service '${key}' not found`);
    }

    console.log(`[Service] Standard Loaded: ${tenantId}:${key}`);
    const moduleData = await standardLoader();
    // Class Constructor 반환
    return moduleData.default as { new (tenantId: string): T };
}
