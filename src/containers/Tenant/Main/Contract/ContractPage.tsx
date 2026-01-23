// src/containers/Tenant/Main/Contract/ContractPage.tsx
import { useQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/core/hooks/useAppConfig';
import { useTenantComponent, useTenantService } from '@/core/hooks/useTenantModule';
import type { IContractService } from '@/standard/contract/services/contract.service';
import PageContainer from '@/uikit/layout/PageContainer';

const ContractPage = () => {
  const { tenantId } = useAppConfig();

  // 1. Load Resources (Service & Components)
  const { service, isLoading: isServiceLoading } = useTenantService<IContractService>('ContractService');
  const { Component: ContractMain } = useTenantComponent('ContractMain');
  const { Component: ContractSidebar } = useTenantComponent('ContractSidebar');
  const { Component: ContractList } = useTenantComponent('ContractList');

  // 2. Fetch Data
  const {
    data,
    isLoading: isDataLoading,
    error,
  } = useQuery({
    queryKey: ['contracts', tenantId],
    queryFn: () => service!.getContracts(),
    enabled: !!service,
  });

  // 3. Loading & Error
  if (isServiceLoading || !ContractMain || !ContractSidebar || !ContractList) {
    return <PageContainer>Loading Resources...</PageContainer>;
  }
  if (error) {
    return <PageContainer>Error: {(error as Error).message}</PageContainer>;
  }

  // 4. Render (Delegation)
  // [핵심] UI 구현을 제거하고 데이터와 슬롯만 주입
  return (
    <ContractMain
      // 데이터 주입
      contracts={data || []}
      isLoading={isDataLoading}
      tenantId={tenantId}
      // 동작 주입 (Event Handler)
      onCreate={() => console.log('Create Contract Clicked')}
      // 슬롯 주입 (Composition)
      sidebar={<ContractSidebar />}
      list={<ContractList contracts={data || []} />}
    />
  );
};

export default ContractPage;
