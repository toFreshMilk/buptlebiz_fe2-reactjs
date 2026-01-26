// src/containers/Tenant/Main/Contract/ContractPage.tsx
import { useAppConfig } from '@/core/hooks/useAppConfig';
import { useTenantComponent } from '@/core/hooks/useTenantModule';

const ContractPage = () => {
  const { tenantId } = useAppConfig();

  const { Component: ContractMain } = useTenantComponent('ContractMain');
  const { Component: ContractSidebar } = useTenantComponent('ContractSidebar');
  const { Component: ContractList } = useTenantComponent('ContractList');

  return (
    <ContractMain
      tenantId={tenantId}
      // Slot 주입 (제어의 역전)
      sidebar={<ContractSidebar />}
      // List 컴포넌트 클래스(함수) 자체를 넘김
      listComponent={ContractList}
    />
  );
};

export default ContractPage;
