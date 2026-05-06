import { ComponentType } from 'react';

// === 로더 타입 (완전 제네릭) ===
export type ModuleWithDefault<T> = { default: T };
export type ComponentLoader = () => Promise<ModuleWithDefault<ComponentType<any>>>;
export type ServiceLoader = () => Promise<ModuleWithDefault<any>>;

// === 설정 구조 ===
export interface TenantConfig {
  id: string;
  name: string;
  features: { i18n: string[]; defaultLang: string; ai: boolean; sso: boolean };
  theme: { primaryColor: string };

  components?: Record<string, ComponentLoader>;
  services?: Record<string, ServiceLoader>;
}
