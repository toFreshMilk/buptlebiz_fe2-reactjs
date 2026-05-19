import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { Button } from '@/core/uikit/form/Button';

const Header = () => {
  const { config } = useAppConfig();
  const { t } = useCoreTranslation('contract');

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-black text-rose-700">
          <span className="px-2 py-1 rounded-full border border-rose-200 bg-rose-50">{t('apr.badge')}</span>
          <span className="text-slate-500">{t('apr.desk')}</span>
        </div>
        <h1 className="mt-2 text-3xl font-black text-slate-900 tracking-tight">{t('apr.board_title')}</h1>
        <div className="mt-1 text-sm text-slate-500">{t('apr.board_desc')}</div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          shape="xl"
          tone="rose"
          uniqueClassName="ui-apr-main-sync"
          style={{ backgroundColor: config.theme.primaryColor }}
          onPress={() => alert(t('apr.alerts.sync_demo'))}
        >
          {t('apr.actions.sync')}
        </Button>
        <Button
          variant="outline"
          tone="rose"
          shape="xl"
          uniqueClassName="ui-apr-main-approval"
          onPress={() => alert(t('apr.alerts.approval_demo'))}
        >
          {t('apr.actions.approval')}
        </Button>
      </div>
    </div>
  );
};

export default Header;
