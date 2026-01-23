// src/containers/Tenant/Main/Contract/ContractDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/core/hooks/useAppConfig';
import PageContainer from '@/uikit/layout/PageContainer';

// [변경] 정적 Import 제거 -> 동적 로딩을 위해 삭제
// import ContractDetailTop from '@/standard/contract/components/ContractDetailTop'; ... (삭제)

// [추가] 동적 훅 및 타입 Import
import { useTenantComponent, useTenantService } from '@/core/hooks/useTenantModule';
import type { IContractService } from '@/standard/contract/services/contract.service';

const ContractDetailPage = () => {
  const { tenantId } = useAppConfig();
  const { id } = useParams<{ id: string }>();

  // 1. Dynamic Service Loading
  // 서비스 클래스가 인스턴스화되어 반환됨 (tenantId 주입 완료 상태)
  const {
    service,
    isLoading: isServiceLoading,
    error: serviceError,
  } = useTenantService<IContractService>('ContractService');

  // 2. Dynamic Component Loading
  // 테넌트별로 오버라이드 가능한 컴포넌트들을 동적으로 로드
  const { Component: ContractDetailTop } = useTenantComponent('ContractDetailTop');
  const { Component: ContractDetailLeft } = useTenantComponent('ContractDetailLeft');
  const { Component: ContractDetailRight } = useTenantComponent('ContractDetailRight');

  // 3. Data Fetching
  const {
    data: contract,
    isLoading: isDataLoading,
    error: dataError,
  } = useQuery({
    queryKey: ['contract', tenantId, id],
    // [변경] 서비스 인스턴스 메서드 호출 (tenantId 인자 불필요)
    queryFn: () => service!.getContractsDetail(), // id는 필수
    enabled: !!service && !!id,
  });

  // 4. Loading State Check (서비스, 컴포넌트, 데이터 모두 체크)
  const isResourcesLoading = isServiceLoading || !ContractDetailTop || !ContractDetailLeft || !ContractDetailRight;

  if (isResourcesLoading || isDataLoading) {
    return <PageContainer>Loading Contract Details...</PageContainer>;
  }

  // 5. Error Handling
  if (serviceError) return <PageContainer>Error loading service module.</PageContainer>;
  if (dataError) return <PageContainer>Error fetching data: {(dataError as Error).message}</PageContainer>;
  if (!contract) return <PageContainer>Contract not found.</PageContainer>;

  // 6. Render
  // 로드된 동적 컴포넌트들로 렌더링
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
