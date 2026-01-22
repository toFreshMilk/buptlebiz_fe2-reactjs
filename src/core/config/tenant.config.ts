import { aprConfig } from './tenants/apr.config';
import { demoConfig } from './tenants/demo.config';

// 테넌트 설정 인터페이스 (타입 정의)
export interface TenantConfig {
    tenantId: string;
    theme: {
        primaryColor: string;
        // 필요한 테마 설정 추가
    };
    features: {
        workspaceBanner: boolean; // 배너 사용 여부
        customSidebar: boolean;   // 커스텀 사이드바 사용 여부
    };
}

// 테넌트별 Config 맵
const TENANT_CONFIG_MAP: Record<string, TenantConfig> = {
    apr: aprConfig,
    demo: demoConfig,
};

/**
 * Tenant ID로 설정을 가져옵니다.
 */
export const getTenantConfig = (tenantId: string): TenantConfig | null => {
    return TENANT_CONFIG_MAP[tenantId] || null;
};
