// src/standard/contract/services/contract.service.ts
import { apiGet, apiPost } from '@/core/services/apiClient';

// [핵심] 서비스 DTO 정의 (Colocation)
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

/**
 * [변경] Class 기반 서비스
 * 테넌트 ID를 상태로 보유하여 메서드 호출 시 반복적인 인자 전달을 제거함
 */
export class ContractService {
    protected tenantId: string;

    constructor(tenantId: string) {
        this.tenantId = tenantId;
    }

    async getContracts(): Promise<StandardContractDto[]> {
        // this.tenantId를 사용하여 호출
        return await apiGet<StandardContractDto[]>('/contracts', this.tenantId);
    }

    async getContractsDetail(): Promise<StandardContractDto[]> {
        return await apiGet<StandardContractDto[]>('/contracts/detail', this.tenantId);
    }

    async getContractsDetail2(): Promise<StandardContractDto[]> {
        return await apiGet<StandardContractDto[]>('/contracts/detail2', this.tenantId);
    }

    async approve(contractId: string): Promise<void> {
        await apiPost('/contracts/approve', this.tenantId, {
            contractId,
            status: 'APPROVED',
        });
    }
}

// [핵심] 서비스 타입 export (인스턴스 타입)
export type IContractService = ContractService;

// Default Export는 클래스 자체
export default ContractService;
