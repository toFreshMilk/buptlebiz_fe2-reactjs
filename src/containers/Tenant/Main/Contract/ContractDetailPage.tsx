import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import PageContainer from '@/uikit/layout/PageContainer';

// [변경] 정적 import 제거 (에러 원인 제거)
// import { StandardContractService } ... (삭제)
// import { DemoContractService } ... (삭제)

// [추가] 동적 훅 import
import { useTenantService } from '@/core/hooks/useTenantModule';
import { IContractService } from '@/standard/contract/types';

import ContractDetailTop from '@/standard/contract/components/ContractDetailTop';
import ContractDetailLeft from '@/standard/contract/components/ContractDetailLeft';
import ContractDetailRight from '@/standard/contract/components/ContractDetailRight';

const ContractDetailPage = () => {
    const { tenantId } = useAppConfig();
    const { id } = useParams<{ id: string }>();

    // [변경] 동적 서비스 로드
    const { service, isLoading: isServiceLoading, error: serviceError } = useTenantService<IContractService>('ContractService');

    const { data: contract, isLoading: isDataLoading } = useQuery({
        queryKey: ['contract', tenantId, id],
        // 서비스가 로드된 후에만 호출
        queryFn: () => service!.getContractDetail(id!),
        enabled: !!service && !!id,
    });

    // 로딩 상태 처리
    if (isServiceLoading || isDataLoading) return <PageContainer>Loading...</PageContainer>;

    // 에러 처리
    if (serviceError) return <PageContainer>Error loading service</PageContainer>;
    if (!contract) return <PageContainer>Contract not found</PageContainer>;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <ContractDetailTop contract={contract} />

            <PageContainer className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ContractDetailLeft contract={contract} />
                    </div>
                    <div className="lg:col-span-1">
                        <ContractDetailRight />
                    </div>
                </div>
            </PageContainer>
        </div>
    );
};

export default ContractDetailPage;
