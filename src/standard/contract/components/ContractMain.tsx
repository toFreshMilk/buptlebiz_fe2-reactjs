// src/standard/contract/components/ContractMain.tsx
import { ReactNode, ComponentType } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenantService } from '@/core/hooks/useTenantModule';
import type { IContractService } from '@/standard/contract/services/contract.service';
import Button from '@/uikit/form/Button';

interface ContractMainProps {
  tenantId: string;
  sidebar: ReactNode;
  listComponent: ComponentType<{ contracts: any[]; isLoading: boolean }>;
}

const ContractMain = ({ tenantId, sidebar, listComponent: ListComponent }: ContractMainProps) => {
  // 1. 서비스 로딩 (Suspense가 적용되어 null 가능성 없음)
  const service = useTenantService<IContractService>('ContractService');

  // 2. 데이터 페칭 (service가 확실히 존재하므로 바로 호출)
  const { data: contracts, isLoading } = useQuery({
    queryKey: ['contracts', tenantId],
    queryFn: () => service.getContracts(),
  });

  const handleCreate = () => {
    console.log('Standard Create Logic');
    // service.createContract(...) // 바로 호출 가능
  };

  return (
    <div className="flex h-full min-h-screen bg-gray-50">
      <div className="w-64 border-r border-gray-200 bg-white">{sidebar}</div>

      <div className="flex-1 flex flex-col p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Standard Contracts</h1>
            <p className="text-sm text-gray-500">Tenant: {tenantId}</p>
          </div>
          <Button onClick={handleCreate}>New Contract</Button>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <ListComponent contracts={contracts || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ContractMain;
