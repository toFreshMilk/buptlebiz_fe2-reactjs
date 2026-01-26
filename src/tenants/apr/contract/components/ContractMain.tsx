// src/tenants/apr/contract/components/AprContractMain.tsx
import { ReactNode, ComponentType } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenantService } from '@/core/hooks/useTenantModule';
import type { IAprContractService } from '@/tenants/apr/contract/services/contract.service';
import type { StandardContractDto } from '@/standard/contract/services/contract.service';

interface ContractMainProps {
  tenantId: string;
  sidebar: ReactNode;
  listComponent: ComponentType<{ contracts: StandardContractDto[]; isLoading: boolean }>;
}

const AprContractMain = ({ tenantId, sidebar, listComponent: ListComponent }: ContractMainProps) => {
  // APR 전용 인터페이스로 서비스 주입
  const { service } = useTenantService<IAprContractService>('ContractService');

  // [스탠다드에는 없는 로직] APR 전용 API 사용
  const { data, isLoading } = useQuery({
    queryKey: ['apr-special-contracts', tenantId],
    queryFn: () => service!.getAprContracts(),
    enabled: !!service,
  });

  return (
    <div className="flex w-full bg-gray-100 min-h-screen">
      <div className="border-r border-gray-300 shadow-xl z-10 bg-slate-900 text-white">{sidebar}</div>
      <div className="flex-1 p-8">
        <div className="mb-8 border-b pb-4 flex justify-between">
          <h2 className="text-3xl font-serif text-rose-700">APR Contracts ({tenantId})</h2>
          <button
            className="bg-rose-600 text-white px-6 py-2 rounded-full"
            onClick={async () => {
              if (!service) return;
              // 오버라이드된 approve 사용 (APR 전용 validate + approve)
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
