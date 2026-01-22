import { apiClient } from '@/core/services/apiClient';
import { IContractService, ContractListResponse, Contract } from '../types';

// Mock Data 사용 (실제 API 연동 시 엔드포인트 호출로 변경)
const MOCK_CONTRACTS: Contract[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `cnt-${i + 1}`,
    title: `Standard Service Agreement ${i + 1}`,
    status: i % 3 === 0 ? 'active' : 'draft',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    amount: (i + 1) * 1000000,
    counterparty: `Partner Corp ${i + 1}`,
    createdAt: new Date().toISOString(),
}));

export const StandardContractService: IContractService = {
    getContracts: async () => {
        // 실제: return apiClient.get('/contracts').then(res => res.data);
        await new Promise(resolve => setTimeout(resolve, 500)); // Latency sim
        return {
            items: MOCK_CONTRACTS,
            total: MOCK_CONTRACTS.length,
            page: 1,
            pageSize: 10,
        };
    },

    getContractDetail: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const contract = MOCK_CONTRACTS.find(c => c.id === id);
        if (!contract) throw new Error('Contract not found');
        return contract;
    },
};
