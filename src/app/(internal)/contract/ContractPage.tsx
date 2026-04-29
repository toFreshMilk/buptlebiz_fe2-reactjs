// src/app/(internal)/contract/ContractPage.tsx
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTenantComponent, useTenantService } from '@/core/hooks/useTenantModule';
import { useAppConfig } from '@/core/contexts/AppConfigContext.ts';
import { Suspense } from 'react';

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
    <div className="flex gap-6 -m-10 p-10 bg-slate-50 min-h-[calc(100vh-64px)]">
      <ContractSidebar />
      <ContractMain contracts={contracts} ListComponent={ContractList} />
    </div>
  );
};

const ContractPage = () => (
  <Suspense fallback={<div>Loading Contract Page...</div>}>
    <ContractPageContent />
  </Suspense>
);

export default ContractPage;
