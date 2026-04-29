// src/app/(internal)/contract/ContractPage.tsx
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTenantComponent, useTenantService } from '@/core/hooks/useTenantModule';
import { useAppConfig } from '@/core/contexts/AppConfigContext.ts';
import { Suspense } from 'react';
import { LoadingBar } from '@/core/utils/LoadingBar';

const ContractPageContent = () => {
  const { tenantId } = useAppConfig();
  const service = useTenantService('ContractService');

  const { data: contracts } = useSuspenseQuery({
    queryKey: ['contracts', tenantId],
    queryFn: () => service.getContracts(tenantId),
  });

  const { Component: ContractMain } = useTenantComponent('ContractMain');
  const { Component: ContractSidebar } = useTenantComponent('ContractSidebar');
  const { Component: ContractList } = useTenantComponent('ContractList');

  return (
    <div className="flex gap-6 p-6 lg:p-10">
      <ContractSidebar />
      <ContractMain contracts={contracts} ListComponent={ContractList} />
    </div>
  );
};

const ContractPage = () => (
  <Suspense fallback={<LoadingBar />}>
    <ContractPageContent />
  </Suspense>
);

export default ContractPage;
