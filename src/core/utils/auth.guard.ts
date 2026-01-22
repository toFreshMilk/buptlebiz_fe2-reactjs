// 유효한 테넌트 목록 (실제로는 API로 받아오거나 Config에서 관리)
const VALID_TENANTS = ['apr', 'demo', 'samsung', 'lg'];

/**
 * 테넌트 ID가 유효한지 검증합니다.
 */
export const isValidTenant = (tenantId: string | undefined): boolean => {
    if (!tenantId) return false;
    return VALID_TENANTS.includes(tenantId);
};
