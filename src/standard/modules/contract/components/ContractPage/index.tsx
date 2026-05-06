import { useSuspenseQuery } from '@tanstack/react-query';
import { useTenantComponent, useTenantService } from '@/core/hooks/useTenantModule';
import { useAppConfig } from '@/core/contexts/AppConfigContext.ts';
import { Suspense } from 'react';
import { LoadingBar } from '@/core/uikit/feedback/LoadingBar';

const ContractPageContent = () => {
  const { tenantId } = useAppConfig();
  const service = useTenantService('ContractService');

  const { data: contracts } = useSuspenseQuery({
    queryKey: ['contracts', tenantId],
    queryFn: () => service.getContracts(tenantId),
  });

  const { Component: Board } = useTenantComponent('ContractBoard');
  const { Component: Sidebar } = useTenantComponent('ContractSidebar');
  const { Component: List } = useTenantComponent('ContractList');

  return (
    <div className="flex gap-6 p-6 lg:p-10">
      <Sidebar />
      <Board contracts={contracts} ListComponent={List} />
    </div>
  );
};


const ContractPage = () => (
  <Suspense fallback={<LoadingBar />}>
    <ContractPageContent />
  </Suspense>
);

export default ContractPage;
