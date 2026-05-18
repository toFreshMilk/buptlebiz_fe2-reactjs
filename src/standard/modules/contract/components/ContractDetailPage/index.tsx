import { useTenantComponent } from '@/core/hooks/useTenantModule';
import { Suspense } from 'react';
import { LoadingBar } from '@/core/uikit/feedback/LoadingBar';

const ContractDetailPageContent = () => {
  const { Component: Top } = useTenantComponent('ContractDetailTop');
  const { Component: Left } = useTenantComponent('ContractDetailLeft');
  const { Component: Right } = useTenantComponent('ContractDetailRight');

  return (
    <div className="p-6 lg:p-10 space-y-6">
      <Top />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <Left />
        </div>
        <div className="w-full lg:w-105 shrink-0">
          <Right />
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