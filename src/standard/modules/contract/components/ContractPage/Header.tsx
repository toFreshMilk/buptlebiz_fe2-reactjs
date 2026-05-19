import { useSuspenseQuery } from '@tanstack/react-query';
import { useQueryState, parseAsString, parseAsStringEnum } from 'nuqs';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useTenantService } from '@/core/hooks/useTenantModule';
import { Button } from '@/core/uikit/form/Button';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import type { StandardContractService } from '@/standard/modules/contract/services/contract.service';
import type { TabKey } from './index';

export default function Header() {
  const { t } = useCoreTranslation('contract');
  const { tenantId } = useAppConfig();
  const service = useTenantService<StandardContractService>('ContractService');

  const [query] = useQueryState('q', parseAsString.withDefault(''));
  const [tab] = useQueryState(
    'tab',
    parseAsStringEnum<TabKey>(['all', 'draft', 'review', 'active']).withDefault('all')
  );

  const { data } = useSuspenseQuery({
    queryKey: ['contracts', tenantId, query, tab],
    queryFn: () => service.getContracts(tenantId, query, tab),
  });

  return (
    <div className="flex items-end justify-between">
      <div>
        <div className="text-sm text-slate-500">
          {t('main.summary_total_label')} : <span className="font-bold text-slate-900">{data.totalCount}</span>{' '}
          {t('main.summary_count_unit')}
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t('title')}</h1>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Button variant="outline" tone="slate" uniqueClassName="ui-standard-main-show-fields">
          {t('main.actions.show_fields')}
        </Button>
        <Button variant="outline" tone="slate" uniqueClassName="ui-standard-main-per-page">
          {t('main.actions.per_page_10')}
        </Button>
      </div>
    </div>
  );
}