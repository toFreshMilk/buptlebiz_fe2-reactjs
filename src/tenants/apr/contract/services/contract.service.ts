// src/tenants/apr/contract/services/contract.service.ts
import { apiPost, apiGet } from '@/core/services/apiClient';
import {
  ContractService as StandardContractService,
  type IContractService,
  type StandardContractDto,
  type ApproveResultDto,
} from '@/standard/contract/services/contract.service';

/**
 * APR 전용 계약 서비스 인터페이스
 * - Standard 계약 서비스 기능 + APR 전용 기능
 */
export interface IAprContractService extends IContractService {
  /**
   * APR 전용: 결재 상태가 'Review' 인 문서만 필터링해서 가져오는 API라고 가정
   * (스탠다드에는 없는 메서드)
   */
  getAprContracts(): Promise<StandardContractDto[]>;
}

/**
 * APR 전용 계약 서비스
 */
export class AprContractService extends StandardContractService implements IAprContractService {
  // [Override] 승인 로직 변경 (유효성 검사 추가 + 결과 반환)
  async approve(contractId: string): Promise<ApproveResultDto> {
    // 1. APR 전용 유효성 검사 API 호출
    await apiPost('/contracts/validate', this['tenantId'], { contractId });

    // 2. 승인 요청 (결과값 받기)
    const result = await apiPost<ApproveResultDto>('/contracts/approve', this['tenantId'], {
      contractId,
      status: 'APPROVED',
    });

    return result;
  }

  // [APR 전용 메서드] 스탠다드에는 없는 기능
  async getAprContracts(): Promise<StandardContractDto[]> {
    // 예시: APR만 사용하는 별도 엔드포인트
    const ff = await apiGet<StandardContractDto[]>('/contracts', this['tenantId']);
    return ff;
  }
}

export default AprContractService;
