// src/core/config/tenant.config.ts
import { ComponentType } from 'react';
import type { TenantConfig, ComponentLoader, ServiceLoader, ModuleWithDefault } from '@/core/config/tenant.types';

// === 0. i18n 부트스트랩 설정 ===
// React 초기화 이전에 i18n이 필요로 하는 기본값 (실제 언어값은 각 테넌트 config의 features.i18n 배열에 정의)
// 이거 고객사별 설정페이지에서 가져와야지 왜 이렇게 선언하냐
export const I18N_CONFIG = {
  defaultLang: 'ko',
} as const;

// === 1. Loaders ===
// 테넌트별 설정 파일(*.config.ts)을 비동기로 로드합니다.
const TenantLoaders: Record<string, () => Promise<ModuleWithDefault<TenantConfig>>> = {
  demo: () => import('@/core/config/tenants/demo.config'),
  apr: () => import('@/core/config/tenants/apr.config'),
};

/**
 * 테넌트 ID가 유효한지(설정이 존재하는지) 검사합니다.
 * useTenant 훅이나 다른 곳에서 검증용으로 씁니다.
 */
export function isValidTenantId(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(TenantLoaders, id);
}

// === 1. Loaders ===
export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
  const loader = TenantLoaders[tenantId];

  if (!loader) {
    // 여기서 에러 메시지에 "가능한 목록"을 같이 보여주면 디버깅이 편합니다.
    const available = Object.keys(TenantLoaders).join(', ');
    throw new Error(`[Config Error] Invalid TenantID: "${tenantId}". Available: [${available}]`);
  }

  const moduleData = await loader();
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

export async function getTenantComponent<T = ComponentType<any>>(tenantId: string, key: string): Promise<T> {
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
export async function getTenantService<T = any>(tenantId: string, key: string): Promise<{ new (tenantId: string): T }> {
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

  const moduleData = await standardLoader();
  // Class Constructor 반환
  return moduleData.default as { new (tenantId: string): T };
}
