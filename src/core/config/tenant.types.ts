// src/core/config/tenant.types.ts
import { ComponentType } from 'react';

// === 로더 타입 (완전 제네릭) ===
export type ModuleWithDefault<T> = { default: T };
export type ComponentLoader = () => Promise<ModuleWithDefault<ComponentType<any>>>;
export type ServiceLoader = () => Promise<ModuleWithDefault<any>>;

// === 설정 구조 ===
export interface TenantConfig {
  id: string;
  name: string;
  features: { i18n: boolean; ai: boolean; sso: boolean };
  theme: { primaryColor: string };

  // [K in string] 인덱스 시그니처 사용
  components?: Record<string, ComponentLoader>;
  services?: Record<string, ServiceLoader>;
}
