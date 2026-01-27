// src/standard/contract/services/contract.service.ts

// 서비스 DTO 정의
import { apiGet, apiPost } from '@/core/service/apiClient.ts';

export type ContractStatus = 'Active' | 'Draft' | 'Review' | 'APPROVED' | 'REJECTED' | (string & {});

export interface StandardContractDto {
  id: number | string;
  title: string;
  status: ContractStatus;
  partner?: string;
  date?: string;
  amount?: string;
  category?: string;
  templateName?: string;
  requester?: string;
  reviewer?: string;
  documentCode?: string;
}

// [추가] 승인 결과 DTO 정의
export interface ApproveResultDto {
  success: boolean;
  approvedAt: string;
  newStatus: string;
  message?: string;
}

export type ContractRow = {
  id: number | string;
  title: string;
  partner?: string;
  status: string;
  date?: string;
  amount?: string;
};

/**
 * Class 기반 서비스
 */
export class ContractService {
  protected tenantId: string;

  constructor(tenantId: string) {
    this.tenantId = tenantId;
  }

  async getContracts(): Promise<StandardContractDto[]> {
    const ff = await apiGet<StandardContractDto[]>('/contracts', this.tenantId);
    return ff;
  }

  async getContractsDetail(id?: string): Promise<StandardContractDto> {
    const url = 'contracts/detail';
    const ff = await apiGet<StandardContractDto>(url, this.tenantId);
    return ff;
  }

  // [수정] 반환 타입을 Promise<void> -> Promise<ApproveResultDto>로 변경
  async approve(contractId: string): Promise<ApproveResultDto> {
    const ff = await apiPost<ApproveResultDto>('/contracts/approve', this.tenantId, {
      contractId,
      status: 'APPROVED',
    });
    return ff;
  }
}

// 컨테이너/코어에서는 이 타입만 알고 있음
export type IContractService = ContractService;
export default ContractService;
