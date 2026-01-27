// src/app/(internal)/contract/ContractPage.tsx
import { useTenantComponent } from '@/core/hooks/useTenantModule';
import { useAppConfig } from '@/core/contexts/AppConfigContext.ts';

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
