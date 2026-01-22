import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

// UI Kit
import Button from '@/uikit/form/Button';

// Services (Business Logic)
import { StandardContractService } from '@/standard/contract/services/contract.service';
import { AprContractService } from '@/tenants/apr/contract/services/contract.service';
import { DemoContractService } from '@/tenants/demo/contract/services/contract.service';

// Standard Components (Default View)
import ContractList from '@/standard/contract/components/ContractList';
import ContractMain from '@/standard/contract/components/ContractMain';
import ContractSidebar from '@/standard/contract/components/ContractSidebar';

// APR Components (Tenant Overrides)
import AprContractMain from '@/tenants/apr/contract/components/ContractMain';
import AprContractSidebar from '@/tenants/apr/contract/components/ContractSidebar';

const ContractPage = () => {
    const { tenantId } = useAppConfig();

    // 1. Service Selection Factory
    // Tenant ID에 따라 적절한 API 서비스 구현체를 선택합니다.
    const service = (() => {
        switch (tenantId) {
            case 'apr':
                return AprContractService;
            case 'demo':
                return DemoContractService;
            default:
                return StandardContractService;
        }
    })();

    // 2. Component Selection Factory
    // Tenant ID에 따라 레이아웃(Container)과 사이드바 컴포넌트를 교체합니다.
    const { LayoutComponent, SidebarComponent } = (() => {
        switch (tenantId) {
            case 'apr':
                return {
                    LayoutComponent: AprContractMain,
                    SidebarComponent: AprContractSidebar
                };
            // Demo나 기타 Tenant는 Standard 컴포넌트를 그대로 사용
            default:
                return {
                    LayoutComponent: ContractMain,
                    SidebarComponent: ContractSidebar
                };
        }
    })();

    // 3. Data Fetching (React Query)
    // 선택된 Service를 사용하여 데이터를 가져옵니다.
    const { data, isLoading, error } = useQuery({
        queryKey: ['contracts', tenantId], // tenantId가 바뀌면 쿼리 키도 변경되어 다시 호출됨
        queryFn: () => service.getContracts(),
    });

    // 4. Error Handling
    if (error) {
        return (
            <LayoutComponent sidebar={<SidebarComponent />}>
                <div className="p-8 text-center border border-red-200 bg-red-50 rounded-lg">
                    <h3 className="text-lg font-bold text-red-600 mb-2">Error Loading Contracts</h3>
                    <p className="text-red-500">{(error as Error).message}</p>
                    <div className="mt-4">
                        <Button onClick={() => window.location.reload()} variant="secondary">
                            Retry
                        </Button>
                    </div>
                </div>
            </LayoutComponent>
        );
    }

    // 5. Render
    // 조립된 레이아웃 안에 리스트 컴포넌트를 주입합니다.
    return (
        <LayoutComponent sidebar={<SidebarComponent />}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Contracts</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your contracts for <span className="font-semibold text-blue-600 uppercase">{tenantId}</span>
                    </p>
                </div>
                <Button onClick={() => console.log('Create Clicked')}>
                    New Contract
                </Button>
            </div>

            <ContractList
                contracts={data?.items || []}
                isLoading={isLoading}
            />
        </LayoutComponent>
    );
};

export default ContractPage;
