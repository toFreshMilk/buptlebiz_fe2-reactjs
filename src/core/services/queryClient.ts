import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // 실패 시 1회 재시도
            staleTime: 1000 * 60, // 1분간 데이터 신선함 유지 (캐싱)
            refetchOnWindowFocus: false,
        },
        mutations: {
            // Mutation 에러 공통 처리
            onError: (error) => {
                console.error('[Mutation Error]', error);
            },
        },
    },
});
