import { Button } from '@/core/uikit/form/Button';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

export interface HeaderProps {
  filteredCount: number;
}

export default function Header({ filteredCount }: HeaderProps) {
  const { t } = useCoreTranslation('contract');
  return (
    <div className="flex items-end justify-between">
      <div>
        <div className="text-sm text-slate-500">
          {t('main.summary_total_label')} : <span className="font-bold text-slate-900">{filteredCount}</span>{' '}
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