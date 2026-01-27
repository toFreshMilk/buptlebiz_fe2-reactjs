// src/custom/apr/contract/components/ContractMain.tsx
import { ReactNode, ComponentType } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenantService } from '@/core/hooks/useTenantModule';
import type { IAprContractService } from '@/custom/apr/contract/services/contract.service';
import type { StandardContractDto } from '@/standard/contract/services/contract.service';

interface ContractMainProps {
  tenantId: string;
  sidebar: ReactNode;
  listComponent: ComponentType<{ contracts: StandardContractDto[]; isLoading: boolean }>;
}

const AprContractMain = ({ tenantId, sidebar, listComponent: ListComponent }: ContractMainProps) => {
  // 1. 서비스 로딩 (Suspense 적용, 타입 안전)
  const service = useTenantService<IAprContractService>('ContractService');

  // 2. 데이터 페칭 (service!. 불필요)
  const { data, isLoading } = useQuery({
    queryKey: ['apr-special-contracts', tenantId],
    queryFn: () => service.getAprContracts(),
  });

  return (
    <div className="flex w-full bg-gray-100 min-h-screen">
      <div className="border-r border-gray-300 shadow-xl z-10 bg-slate-900 text-white">{sidebar}</div>
      <div className="flex-1 p-8">
        <div className="mb-8 border-b pb-4 flex justify-between">
          <h2 className="text-3xl font-serif text-rose-700">APR Contracts ({tenantId})</h2>
          <button
            className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition-colors"
            onClick={async () => {
              // 3. 버튼 클릭 핸들러 (if (!service) 불필요)
              const result = await service.approve('dummy-id');
              console.log('APR approve result', result);
            }}
          >
            + 생성하기
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[500px]">
          <ListComponent contracts={data || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AprContractMain;
