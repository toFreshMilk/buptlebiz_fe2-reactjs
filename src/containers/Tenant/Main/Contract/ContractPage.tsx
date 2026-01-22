// src/containers/Tenant/Main/Contract/ContractPage.tsx
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useTenantComponent, useTenantService } from '@/core/hooks/useTenantModule';

// Types
import type { IContractService } from '@/standard/contract/services/contract.service';

// UI Kit
import Button from '@/uikit/form/Button';
import PageContainer from '@/uikit/layout/PageContainer';

const ContractPage = () => {
    const { tenantId } = useAppConfig();

    // 1. Dynamic Resource Loading (No Switch-Case!)
    // 설정 파일(tenant.config.ts)에 정의된 매핑에 따라 자동으로 로드됨
    // 서비스는 이미 tenantId가 주입된 상태로 반환됨
    const { service, isLoading: isServiceLoading } = useTenantService<IContractService>('ContractService');
    const { Component: ContractMain } = useTenantComponent('ContractMain');
    const { Component: ContractSidebar } = useTenantComponent('ContractSidebar');
    const { Component: ContractList } = useTenantComponent('ContractList');

    // 2. Data Fetching
    // 서비스가 로드된 후에만 쿼리를 실행 (enabled 옵션)
    const { data, isLoading: isDataLoading, error } = useQuery({
        queryKey: ['contracts', tenantId],
        // [변경] 더 이상 인자를 넘길 필요가 없음. Service 내부에서 처리.
        queryFn: () => service!.getContracts(),
        enabled: !!service, // 서비스 로드 완료 시 실행
    });

    // 3. Loading State (리소스 로딩 or 데이터 로딩)
    if (isServiceLoading || !ContractMain || !ContractSidebar || !ContractList) {
        return <PageContainer>Loading Resources...</PageContainer>;
    }

    // 4. Error Handling
    if (error) {
        return <PageContainer>Error: {(error as Error).message}</PageContainer>;
    }

    // 5. Render
    // 로드된 컴포넌트(ContractMain, ContractSidebar)를 그대로 사용
    return (
        <ContractMain sidebar={<ContractSidebar />}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Contracts</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Dynamic Loader: <span className="font-semibold text-blue-600 uppercase">{tenantId}</span>
                    </p>
                </div>
                <Button onClick={() => console.log('Create Clicked')}>
                    New Contract
                </Button>
            </div>

            <ContractList
                contracts={data || []}
                isLoading={isDataLoading}
            />
        </ContractMain>
    );
};

export default ContractPage;
