// src/pages/contract/ContractDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useTenantComponent } from '@/core/hooks/useTenantModule';

const ContractDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { Component: ContractDetailTop } = useTenantComponent('ContractDetailTop');
  const { Component: ContractDetailLeft } = useTenantComponent('ContractDetailLeft');
  const { Component: ContractDetailRight } = useTenantComponent('ContractDetailRight');

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Top 영역 */}
      <ContractDetailTop contractId={id} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* 좌측 영역 */}
        <div className="lg:col-span-2">
          <ContractDetailLeft contractId={id} />
        </div>
        {/* 우측 영역 */}
        <div className="lg:col-span-1">
          <ContractDetailRight contractId={id} />
        </div>
      </div>
    </div>
  );
};

export default ContractDetailPage;
