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

async function getContracts(tenant: string): Promise<StandardContractDto[]> {
    return await apiGet<StandardContractDto[]>('/contracts', tenant);
}

async function getContractsDetail(tenant: string): Promise<StandardContractDto[]> {
    return await apiGet<StandardContractDto[]>('/contracts/detail', tenant);
}

async function getContractsDetail2(tenant: string): Promise<StandardContractDto[]> {
    return await apiGet<StandardContractDto[]>('/contracts/detail2', tenant);
}

async function approve(tenant: string, contractId: string): Promise<void> {
    await apiPost('/contracts/approve', tenant, {
        contractId,
        status: 'APPROVED',
    });
}

const contractService = {
    getContracts,
    getContractsDetail,
    getContractsDetail2,
    approve,
};

// [핵심] 서비스 타입 export
export type StandardContractService = typeof contractService;

export default contractService;
