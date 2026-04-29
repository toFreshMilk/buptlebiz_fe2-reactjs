import { Button } from '@/uikit/form/Button';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

export interface ContractMainHeaderProps {
  filteredCount: number;
}

export default function ContractMainHeader({ filteredCount }: ContractMainHeaderProps) {
  const { t } = useCoreTranslation('contract');
  return (
    <div className="flex items-end justify-between">
      <div>
        <div className="text-sm text-slate-500">
          {t('main.summary_total_label', { defaultValue: '전체' })} : <span className="font-bold text-slate-900">{filteredCount}</span>{' '}
          {t('main.summary_count_unit', { defaultValue: '건' })}
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t('title', { defaultValue: '계약' })}</h1>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Button variant="outline" tone="slate" uniqueClassName="ui-standard-main-show-fields">
          {t('main.actions.show_fields', { defaultValue: '필드 표시' })}
        </Button>
        <Button variant="outline" tone="slate" uniqueClassName="ui-standard-main-per-page">
          {t('main.actions.per_page_10', { defaultValue: '10개씩 보기' })}
        </Button>
      </div>
    </div>
  );
}