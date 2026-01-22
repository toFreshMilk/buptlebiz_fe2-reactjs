import { TenantConfig } from '../tenant.config';

export const demoConfig: TenantConfig = {
    tenantId: 'demo',
    theme: {
        primaryColor: '#1890ff', // Demo Blue
    },
    features: {
        workspaceBanner: true, // Demo도 배너 사용
        customSidebar: false,  // 기본 사이드바 사용
    },
};
