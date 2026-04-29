import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

export default function WorkspaceBanner() {
  const { t } = useCoreTranslation('common');

  return (
    <div className="w-full bg-rose-50 text-rose-900 border-b border-rose-200 px-6 py-2 text-sm font-bold">
      {t('workspace_banner.apr')}
    </div>
  );
}