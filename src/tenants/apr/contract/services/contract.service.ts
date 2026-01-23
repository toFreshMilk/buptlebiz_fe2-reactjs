// src/tenants/apr/contract/services/contract.service.ts
import { apiPost } from '@/core/services/apiClient';
import { ContractService as StandardContractService } from '@/standard/contract/services/contract.service';
import type { ApproveResultDto } from '@/standard/contract/services/contract.service';

/**
 * APR 전용 계약 서비스
 */
export class AprContractService extends StandardContractService {
  // [Override] 승인 로직 변경 (유효성 검사 추가 + 결과 반환)
  async approve(contractId: string): Promise<ApproveResultDto> {
    // 1. APR 전용 유효성 검사 API 호출
    // (this.tenantId는 protected이므로 접근 가능하지만, 타입 안전성을 위해 this['tenantId'] 대신 그냥 this.tenantId 사용 권장.
    // 만약 Standard에서 protected로 선언했다면 this.tenantId로 바로 접근 가능)
    await apiPost('/contracts/validate', this['tenantId'], { contractId });

    // 2. 승인 요청 (결과값 받기)
    const result = await apiPost<ApproveResultDto>('/contracts/approve', this['tenantId'], {
      contractId,
      status: 'APPROVED',
    });
    // console.log(result);

    // 3. 결과 반환 (Container에서 비즈니스 로직 처리에 사용)
    return result;
  }
}

export default AprContractService;
