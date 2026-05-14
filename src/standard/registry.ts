import type { ComponentLoader, ServiceLoader } from '@/core/config/tenant.types';

/**
 * Standard Registry
 * 표준 컴포넌트/서비스/i18n owner-map을 이 파일에서 중앙 관리합니다.
 * 키 타입을 export 해서 Core에서 오타를 컴파일 타임에 잡을 수 있게 합니다.
 */

export const STANDARD_COMPONENT_LOADERS = {
  // ===== Shared =====
  TopNavbar: () => import('@/standard/shared/components/TopNavbar'),
  WorkspaceBanner: () => import('@/standard/shared/components/WorkspaceBanner'),

  // ===== Layouts =====
  RootLayout: () => import('@/standard/layouts/RootLayout/index'),
  RootError: () => import('@/standard/layouts/RootLayout/RootError'),
  PublicLayout: () => import('@/standard/layouts/RootLayout/PublicLayout/index'),
  InternalLayout: () => import('@/standard/layouts/RootLayout/InternalLayout/index'),
  InternalError: () => import('@/standard/layouts/RootLayout/InternalLayout/InternalError'),

  // ===== Auth =====
  LoginPage: () => import('@/standard/modules/auth/components/LoginPage/index'),

  // ===== Contract =====
  ContractPage: () => import('@/standard/modules/contract/components/ContractPage/index'),
  ContractDetailPage: () => import('@/standard/modules/contract/components/ContractDetailPage/index'),
  ContractSidebar: () => import('@/standard/modules/contract/components/ContractPage/Sidebar'),
  ContractList: () => import('@/standard/modules/contract/components/ContractPage/List'),
  ContractDetailTop: () => import('@/standard/modules/contract/components/ContractDetailPage/Top'),
  ContractDetailLeft: () => import('@/standard/modules/contract/components/ContractDetailPage/Left'),
  ContractDetailRight: () => import('@/standard/modules/contract/components/ContractDetailPage/Right'),
} satisfies Record<string, ComponentLoader>;

export const STANDARD_SERVICE_LOADERS = {
  // ===== Auth =====
  AuthService: () => import('@/standard/modules/auth/services/auth.service'),

  // ===== Contract =====
  ContractService: () => import('@/standard/modules/contract/services/contract.service'),
} satisfies Record<string, ServiceLoader>;

// Standard 키 타입 (오타 방지/자동완성)
export type StandardComponentKey = keyof typeof STANDARD_COMPONENT_LOADERS;
export type StandardServiceKey = keyof typeof STANDARD_SERVICE_LOADERS;

/**
 * i18n owner map
 * namespace -> owner(폴더 루트) 매핑
 * 예: common => shared
 * 예: contract => contract
 */
export const STANDARD_I18N_OWNER_BY_NAMESPACE = {
  common: 'shared',
  auth: 'modules/auth',
  contract: 'modules/contract',
} as const satisfies Record<string, string>;

export type StandardI18nNamespace = keyof typeof STANDARD_I18N_OWNER_BY_NAMESPACE;

/**
 * 필요한 namespace만 골라서 owner map을 만들어줍니다.
 */
export function pickI18nOwnerMap(namespaces: readonly string[]) {
  const out: Record<string, string> = {};
  const ownerMap: Record<string, string> = STANDARD_I18N_OWNER_BY_NAMESPACE;

  for (const ns of namespaces) {
    const owner = ownerMap[ns];
    if (!owner) {
      throw new Error(`[i18n registry] unknown namespace: ${ns}`);
    }
    out[ns] = owner;
  }
  return out;
}
