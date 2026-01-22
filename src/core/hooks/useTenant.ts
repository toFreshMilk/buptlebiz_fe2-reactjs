// src/core/hooks/useTenant.ts

/**
 * 호스트네임의 첫 번째 파트(서브도메인)를 무조건 Tenant ID로 간주합니다.
 * - demo.localhost -> demo
 * - apr.buptle.com -> apr
 * - localhost -> localhost (이건 유효한 tenantId가 아니므로 Config 로드에서 실패하거나 에러 처리됨)
 */
export const useTenant = () => {
    if (typeof window === 'undefined') {
        return { tenantId: undefined };
    }

    const hostname = window.location.hostname; // 예: "demo.localhost"

    const parts = hostname.split('.');

    // [핵심] 로컬호스트 편의 로직 제거. 무조건 점(.) 앞부분을 가져옴.
    // "localhost"(점 없음)인 경우 parts[0]은 "localhost"가 됨 -> Config 로드 실패 -> 에러 발생 (의도한 동작)
    // "demo.localhost"인 경우 parts[0]은 "demo" -> Config 로드 성공
    if (parts.length > 1) {
        return { tenantId: parts[0] };
    }

    // 점이 없는 도메인 (예: localhost, buptlebiz)
    // 서브도메인이 없다고 판단 -> undefined 리턴 -> AppConfigContext에서 "Tenant ID Missing" 에러 발생
    return { tenantId: undefined };
};
