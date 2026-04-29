import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

export default function WorkspaceBanner() {
  const { t } = useCoreTranslation('common');

  return (
    <div className="w-full bg-purple-100 text-purple-900 border-b border-purple-200 px-6 py-2 text-sm font-medium">
      {t('workspace_banner.demo')}
    </div>
  );
}