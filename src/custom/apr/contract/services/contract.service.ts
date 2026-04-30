import { apiPost } from '@/core/service/apiClient';
import { StandardContractService } from '@/standard/contract/services/contract.service';
import type { StandardContractDto } from '@/standard/contract/services/contract.service';

export class AprContractService extends StandardContractService {
  // 1. Core의 apiGet을 래핑(Wrapping)하여 전/후처리 추가
  protected async customApiGet<T>(path: string, tenantId: string): Promise<T> {
    console.log(`[APR Custom] API 요청 전 특별한 암호화 토큰 생성 로직... (경로: ${path})`);
    const customHeaders = { 'X-APR-Token': 'super-secret' };
    
    // fetch 직접 구현 (Mock)
    const res = await fetch(`/mock-data/${path.replace(/^\/+/, '')}/${tenantId}.json`, { headers: customHeaders });
    return res.json();
  }

  // 2. 상속받은 메서드 오버라이딩 (Core 대신 Custom 메서드 사용)
  override async getContracts(tenantId: string): Promise<StandardContractDto[]> {
    console.log('[APR] 계약 목록은 우리만의 특별한 통신 API를 탑니다.');
    // 부모가 쓰던 apiGet 대신 내가 만든 customApiGet 호출
    return await this.customApiGet<StandardContractDto[]>('/contracts', tenantId);
  }

  override async approve(tenant: string, contractId: string): Promise<void> {
    console.log('[APR] 결재 처리 시 유효성 검증을 먼저 수행합니다.');
    await apiPost('contracts/validate', tenant, { contractId });
    
    // 이어서 부모의 approve를 호출하거나 직접 구현 가능
    // 여기서는 명시적으로 apiPost 직접 구현 (기존 로직 유지)
    await apiPost('contracts/approve', tenant, {
      contractId,
      status: 'APPROVED',
    });
  }
}

export default new AprContractService();
