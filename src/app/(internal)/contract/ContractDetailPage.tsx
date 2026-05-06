// src/app/(internal)/contract/ContractDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTenantComponent, useTenantService } from '@/core/hooks/useTenantModule';
import { useAppConfig } from '@/core/contexts/AppConfigContext.ts';
import { Suspense } from 'react';
import { LoadingBar } from '@/uikit/feedback/LoadingBar';

const ContractDetailPageContent = () => {
  const { id } = useParams<{ id: string }>();
  const { tenantId } = useAppConfig();
  const service = useTenantService('ContractService');

  const { data: detailList } = useSuspenseQuery({
    queryKey: ['contractsDetail', tenantId],
    queryFn: () => service.getContractsDetail(tenantId),
  });

  const { data: detailList2 } = useSuspenseQuery({
    queryKey: ['contractsDetail2', tenantId],
    queryFn: () => service.getContractsDetail2(tenantId),
  });

  const { data: contractsList } = useSuspenseQuery({
    queryKey: ['contracts', tenantId],
    queryFn: () => service.getContracts(tenantId),
  });

  const { Component: ContractDetailTop } = useTenantComponent('ContractDetailTop');
  const { Component: ContractDetailLeft } = useTenantComponent('ContractDetailLeft');
  const { Component: ContractDetailRight } = useTenantComponent('ContractDetailRight');

  return (
    <div className="p-6 lg:p-10 space-y-6">
      <ContractDetailTop data={detailList} contractId={id} />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <ContractDetailLeft data={contractsList} contractId={id} />
        </div>
        <div className="w-full lg:w-[420px] shrink-0">
          <ContractDetailRight data={detailList2} contractId={id} />
        </div>
      </div>
    </div>
  );
};

const ContractDetailPage = () => (
  <Suspense fallback={<LoadingBar />}>
    <ContractDetailPageContent />
  </Suspense>
);

export default ContractDetailPage;
