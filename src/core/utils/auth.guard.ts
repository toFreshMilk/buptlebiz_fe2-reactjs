// src/core/utils/auth.guard.ts
// 유효한 테넌트 목록
const VALID_TENANTS = ['apr', 'demo', 'samsung', 'lg'];

/**
 * 현재 호스트네임(서브도메인)에서 tenantId를 추출합니다.
 * 예: demo.localhost:3000 -> 'demo'
 * 예: apr.buptle.com -> 'apr'
 */
export const getTenantFromSubdomain = (): string | null => {
    const hostname = window.location.hostname; // 예: "demo.localhost"

    // IP 접속이나 localhost(서브도메인 없음)인 경우 처리
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return null;
    }

    const parts = hostname.split('.');
    // 보통 첫 번째 파트가 서브도메인입니다.
    const subdomain = parts[0];

    return VALID_TENANTS.includes(subdomain) ? subdomain : null;
};

export const isValidTenant = (tenantId: string | undefined): boolean => {
    if (!tenantId) return false;
    return VALID_TENANTS.includes(tenantId);
};
