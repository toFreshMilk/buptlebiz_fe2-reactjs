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
    throw new Error(`[Config Error] Invalid TenantID: "${tenantId}". Available: [${available}]`);
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
    console.error(`[Component Error] Component '${key}' not found for tenant '${tenantId}'`);
    throw new Error(`Component '${key}' not found`);
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
    console.log(`[Service] Custom Loaded: ${tenantId}:${key}`);
    const moduleData = await tenantLoader();
    return moduleData.default as T;
  }

  const { STANDARD_SERVICE_LOADERS } = await import('@/standard/registry');
  const standardLoaders: Record<string, ServiceLoader> = STANDARD_SERVICE_LOADERS;
  const standardLoader = standardLoaders[key];

  if (!standardLoader) {
    throw new Error(`Service '${key}' not found`);
  }

  const moduleData = await standardLoader();
  return moduleData.default as T;
}

