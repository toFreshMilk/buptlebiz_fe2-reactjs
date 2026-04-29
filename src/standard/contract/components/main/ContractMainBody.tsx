import { type ComponentType } from 'react';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

type ContractItem = {
  id: number | string;
  title: string;
  status: string;
};

export interface ContractMainBodyProps {
  filtered: ContractItem[];
  ListComponent?: ComponentType<{ contracts?: ContractItem[] }>;
}

export default function ContractMainBody({ filtered, ListComponent }: ContractMainBodyProps) {
  const { t } = useCoreTranslation('contract');
  return (
    <div className="space-y-3">
      {ListComponent ? (
        <ListComponent contracts={filtered} />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="text-sm text-slate-500">{t('main.list_component_load_failed')}</div>
        </div>
      )}
    </div>
  );
}