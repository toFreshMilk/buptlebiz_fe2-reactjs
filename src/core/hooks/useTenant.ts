
/**
 * 호스트네임의 첫 번째 파트(서브도메인)를 무조건 Tenant ID로 추출합니다.
 * 서브도메인이 없으면 즉시 에러를 발생시킵니다.
 *
 * 반환값: string (무조건 존재함)
 */
import { isValidTenantId } from '@/core/config/tenant.config';

export const useTenant = (): { tenantId: string } => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  if (parts.length < 2) throw new Error(`Invalid Domain: ${hostname}`);

  const tenantId = parts[0];

  // [핵심] Config에 정의된 키인지 확인
  if (!isValidTenantId(tenantId)) {
    throw new Error(`알 수 없는 테넌트입니다: "${tenantId}". tenant.config.ts를 확인하세요.`);
  }

  return { tenantId };
};
