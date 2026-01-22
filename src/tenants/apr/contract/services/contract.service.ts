import { IContractService } from '@/standard/contract/types';
import { StandardContractService } from '@/standard/contract/services/contract.service';

// APR은 표준 로직을 상속받되, 일부만 변경한다고 가정
export const AprContractService: IContractService = {
    ...StandardContractService,

    getContracts: async () => {
        // APR 전용 API 호출 혹은 데이터 가공
        console.log('[APR] Fetching contracts with special logic...');
        const result = await StandardContractService.getContracts();

        // APR은 제목에 접두사를 붙임 (예시)
        return {
            ...result,
            items: result.items.map(item => ({
                ...item,
                title: `[APR] ${item.title}`
            }))
        };
    }
};
