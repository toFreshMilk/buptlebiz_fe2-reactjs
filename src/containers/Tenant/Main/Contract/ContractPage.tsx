// src/containers/Tenant/Main/Contract/ContractPage.tsx
import { useAppConfig } from '@/core/hooks/useAppConfig';
import { useTenantComponent } from '@/core/hooks/useTenantModule';
import PageContainer from '@/uikit/layout/PageContainer';

const ContractPage = () => {
  const { tenantId } = useAppConfig();

  // 1. Load Components (Only Components, No Service needed here)
  const { Component: ContractMain, isLoading: isMainLoading } = useTenantComponent('ContractMain');
  const { Component: ContractSidebar } = useTenantComponent('ContractSidebar');

  // Sidebar와 List를 여기서 조합할지, Main 안에서 할지는 선택이지만
  // "Colocation" 원칙상 Main이 List를 스스로 결정하는 게 더 강력할 수 있음.
  // 하지만 여기서는 기존 구조(Slot 주입)를 유지하면서 데이터 책임만 넘겨보겠습니다.
  const { Component: ContractList } = useTenantComponent('ContractList');

  // 2. Loading
  if (isMainLoading || !ContractMain || !ContractSidebar || !ContractList) {
    return <PageContainer>Loading Resources...</PageContainer>;
  }

  // 3. Render (Composition only)
  // Page는 데이터를 모름. 그냥 컴포넌트끼리 인사만 시켜줌.
  return (
    <ContractMain
      tenantId={tenantId}
      // Slot 주입 (제어의 역전)
      sidebar={<ContractSidebar />}
      // List에게도 데이터를 Page가 주지 않음. List 스스로 데이터를 가져오거나 Main이 관장함.
      // 여기서는 List 컴포넌트 자체를 넘겨서 Main이 렌더링하도록 함
      listComponent={ContractList}
    />
  );
};

export default ContractPage;
