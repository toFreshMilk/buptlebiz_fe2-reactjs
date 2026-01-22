// src/standard/contract/types.ts
// Contract 도메인 엔티티
export interface Contract {
    id: string;
    title: string;
    status: 'draft' | 'active' | 'expired' | 'terminated';
    startDate: string;
    endDate: string;
    amount: number;
    counterparty: string;
    createdAt: string;
}

// 목록 조회 응답
export interface ContractListResponse {
    items: Contract[];
    total: number;
    page: number;
    pageSize: number;
}

// 서비스 인터페이스 (Standard 및 Tenant 구현체가 따라야 할 규약)
export interface IContractService {
    getContracts(params?: any): Promise<ContractListResponse>;
    getContractDetail(id: string): Promise<Contract>;
    // createContract, updateContract 등...
}
