// src/custom/apr/contract/components/ContractMain.tsx

import { ReactNode, ComponentType } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenantService } from '@/core/hooks/useTenantModule';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import type { IAprContractService } from '@/custom/apr/contract/services/contract.service';
import type { StandardContractDto } from '@/standard/contract/services/contract.service';

// [1] 내(APR) 전용 데이터만 가져옴 (Standard는 Core가 알아서 로드함)
import aprLocales from '@/custom/apr/shared/locales/ko/contract.json';

interface ContractMainProps {
  tenantId: string;
  sidebar: ReactNode;
  listComponent: ComponentType<{ contracts: StandardContractDto[]; isLoading: boolean }>;
}

const AprContractMain = ({ tenantId, sidebar, listComponent: ListComponent }: ContractMainProps) => {
  const service = useTenantService<IAprContractService>('ContractService');

  const { data, isLoading } = useQuery({
    queryKey: ['apr-special-contracts', tenantId],
    queryFn: () => service.getAprContracts(),
  });

  // [2] 'contract' 네임스페이스 로드 + aprLocales 병합
  const { t } = useCoreTranslation('contract', aprLocales);

  return (
    <div className="flex w-full bg-gray-100 min-h-screen">
      <div className="border-r border-gray-300 shadow-xl z-10 bg-slate-900 text-white">{sidebar}</div>
      <div className="flex-1 p-8">
        <div className="mb-8 border-b pb-4 flex justify-between">
          <h2 className="text-3xl font-serif text-rose-700">APR Contracts ({tenantId})</h2>

          <button
            className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition-colors"
            onClick={async () => {
              const result = await service.approve('dummy-id');
              console.log('APR approve result', result);
            }}
          >
            {/*
              Standard(common.json): "저장" (defaultNS가 common이면 'save'만 써도 됨)
              여기서는 contract 네임스페이스를 쓰므로 t('common:save') 처럼 써야 할 수도 있음.
              하지만 보통 UI 버튼 텍스트는 해당 도메인 json에 정의하는 게 좋음.
              예: contract.json 에 "save_btn": "계약 저장"
            */}
            + {t('title')}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[500px]">
          <p className="mb-4">{t('apr_special_field')}</p>
          <ListComponent contracts={data || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AprContractMain;
