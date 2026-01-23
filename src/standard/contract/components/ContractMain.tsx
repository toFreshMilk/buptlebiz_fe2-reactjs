// src/standard/contract/components/ContractMain.tsx
import { ReactNode, ComponentType } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenantService } from '@/core/hooks/useTenantModule'; // 서비스 hook
import type { IContractService } from '@/standard/contract/services/contract.service';
import Button from '@/uikit/form/Button';

interface ContractMainProps {
  tenantId: string;
  sidebar: ReactNode;
  // List 컴포넌트를 '값'으로 받는 게 아니라 '타입(Component)'으로 받아서 내부에서 렌더링
  listComponent: ComponentType<{ contracts: any[]; isLoading: boolean }>;
}

const ContractMain = ({ tenantId, sidebar, listComponent: ListComponent }: ContractMainProps) => {
  // [Self-Contained Logic] 서비스 호출 및 데이터 로딩을 구현체가 직접 수행
  const { service } = useTenantService<IContractService>('ContractService');

  const { data: contracts, isLoading } = useQuery({
    queryKey: ['contracts', tenantId],
    queryFn: () => service!.getContracts(),
    enabled: !!service,
  });

  const handleCreate = () => {
    console.log('Standard Create Logic');
    // service?.createContract(...)
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
          {/* 데이터 소유권자가 데이터를 하위 컴포넌트에 주입 */}
          <ListComponent contracts={contracts || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ContractMain;
