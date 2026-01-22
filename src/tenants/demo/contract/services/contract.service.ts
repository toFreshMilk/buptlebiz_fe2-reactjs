import { IContractService } from '@/standard/contract/types';

export const DemoContractService: IContractService = {
    getContracts: async () => {
        // Demo는 완전히 다른 Mock 데이터를 리턴
        return {
            items: [
                {
                    id: 'demo-1',
                    title: 'Demo Contract 1 (Read-Only)',
                    status: 'active',
                    startDate: '2025-01-01',
                    endDate: '2025-12-31',
                    amount: 50000,
                    counterparty: 'Demo Partner',
                    createdAt: new Date().toISOString(),
                }
            ],
            total: 1,
            page: 1,
            pageSize: 10,
        };
    },
    getContractDetail: async (id) => {
        return {
            id,
            title: 'Demo Contract Detail',
            status: 'active',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            amount: 99999,
            counterparty: 'Demo User',
            createdAt: new Date().toISOString(),
        };
    }
};
