import { useQueryState, parseAsStringEnum } from 'nuqs';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { Button } from '@/core/uikit/form/Button';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import type { TabKey } from './index';

export default function Tabs() {
  const { t } = useCoreTranslation('contract');
  const { config } = useAppConfig();

  const [activeTab, setTab] = useQueryState(
    'tab',
    parseAsStringEnum<TabKey>(['all', 'draft', 'review', 'active']).withDefault('all')
  );

  const tabs: { k: TabKey; label: string }[] = [
    { k: 'all', label: t('main.tabs.all') },
    { k: 'draft', label: t('main.tabs.draft') },
    { k: 'review', label: t('main.tabs.review') },
    { k: 'active', label: t('main.tabs.active') },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 flex gap-2">
      {tabs.map((x) => (
        <Button
          key={x.k}
          shape="xl"
          variant={activeTab === x.k ? 'solid' : 'ghost'}
          tone={activeTab === x.k ? 'slate' : 'slate'}
          uniqueClassName={`ui-standard-main-tab-${x.k}`}
          style={activeTab === x.k ? { backgroundColor: config.theme.primaryColor } : undefined}
          onPress={() => setTab(x.k)}
        >
          {x.label}
        </Button>
      ))}
    </div>
  );
}