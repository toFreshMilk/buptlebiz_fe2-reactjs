import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { Button } from '@/core/uikit/form/Button';

export default function RightActions() {
  const { t } = useCoreTranslation('contract');
  const { config } = useAppConfig();

  return (
    <section className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex gap-2">
          <Button fullWidth variant="outline" tone="slate" uniqueClassName="ui-standard-right-download">
            {t('detailRight.downloadStamp')}
          </Button>
          <Button
            fullWidth
            tone="slate"
            uniqueClassName="ui-standard-right-stamp-check"
            style={{ backgroundColor: config.theme.primaryColor }}
          >
            {t('detailRight.confirmStamp')}
          </Button>
        </div>
      </div>

      <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open>
        <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
          <div className="font-black text-slate-900">{t('detailRight.shareLegal')}</div>
          <div className="text-slate-400">⌄</div>
        </summary>
        <div className="px-5 pb-5">
          <div className="text-sm text-slate-500">{t('detailRight.shareLegalDesc')}</div>
        </div>
      </details>
    </section>
  );
}
