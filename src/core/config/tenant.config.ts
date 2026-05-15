import { ComponentType } from 'react';
import type { TenantConfig, ComponentLoader, ServiceLoader, ModuleWithDefault } from '@/core/config/tenant.types';
import type { StandardComponentKey, StandardServiceKey } from '@/standard/registry';

// === 1. Loaders ===
// 테넌트별 설정 파일(*.config.ts)을 비동기로 로드합니다.
const TenantLoaders: Record<string, () => Promise<ModuleWithDefault<TenantConfig>>> = {
  demo: () => import('@/core/config/tenants/demo.config'),
  apr: () => import('@/core/config/tenants/apr.config'),
};

export function isValidTenantId(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(TenantLoaders, id);
}

export async function loadTenantConfig(tenantId: string): Promise<TenantConfig> {
  const loader = TenantLoaders[tenantId];

  if (!loader) {
    const available = Object.keys(TenantLoaders).join(', ');
    throw new Error(`[설정 오류] 유효하지 않은 테넌트 ID: "${tenantId}". 사용 가능: [${available}]`);
  }

  const moduleData = await loader();
  return { ...moduleData.default, id: tenantId };
}

// === 2. Component Loader ===
// 오버로드: 표준 키는 컴파일 타임에 오타를 잡고 자동완성도 받는다.
export async function getTenantComponent<T = ComponentType<any>>(tenantId: string, key: StandardComponentKey): Promise<T>;
export async function getTenantComponent<T = ComponentType<any>>(tenantId: string, key: string): Promise<T>;
export async function getTenantComponent<T = ComponentType<any>>(tenantId: string, key: string): Promise<T> {
  const config = await loadTenantConfig(tenantId);
  const { STANDARD_COMPONENT_LOADERS } = await import('@/standard/registry');

  const standardLoaders: Record<string, ComponentLoader> = STANDARD_COMPONENT_LOADERS;
  const standardLoader = standardLoaders[key];
  const loader = config.components?.[key] || standardLoader;

  if (!loader) {
    console.error(`[컴포넌트 오류] 테넌트 '${tenantId}'에 대한 컴포넌트 '${key}'를 찾을 수 없습니다.`);
    throw new Error(`컴포넌트 '${key}'를 찾을 수 없습니다.`);
  }

  const moduleData = await loader();
  return moduleData.default as T;
}

// === 3. Service Loader ===
export async function getTenantService<T = any>(tenantId: string, key: StandardServiceKey): Promise<T>;
export async function getTenantService<T = any>(tenantId: string, key: string): Promise<T>;
export async function getTenantService<T = any>(tenantId: string, key: string): Promise<T> {
  const config = await loadTenantConfig(tenantId);
  const tenantLoader = config.services?.[key];

  if (tenantLoader) {
    console.log(`[서비스] 커스텀 로드됨: ${tenantId}:${key}`);
    const moduleData = await tenantLoader();
    return moduleData.default as T;
  }

  const { STANDARD_SERVICE_LOADERS } = await import('@/standard/registry');
  const standardLoaders: Record<string, ServiceLoader> = STANDARD_SERVICE_LOADERS;
  const standardLoader = standardLoaders[key];

  if (!standardLoader) {
    throw new Error(`서비스 '${key}'를 찾을 수 없습니다.`);
  }

  const moduleData = await standardLoader();
  return moduleData.default as T;
}