import { type ComponentType } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { useQueryState, parseAsString, parseAsStringEnum } from 'nuqs';
import ContractMainHeader from './main/ContractMainHeader';
import ContractMainTabs from './main/ContractMainTabs';
import ContractMainSummary from './main/ContractMainSummary';
import ContractMainBody from './main/ContractMainBody';

type TabKey = 'all' | 'draft' | 'review' | 'active';
type ContractItem = {
  id: number | string;
  title: string;
  status: string;
};

export interface ContractMainProps {
  contracts: ContractItem[];
  ListComponent: ComponentType<{ contracts?: ContractItem[] }>;
}

export default function ContractMain({ contracts, ListComponent }: ContractMainProps) {
  const { t } = useCoreTranslation('contract');

  const { config } = useAppConfig();
  const navigate = useNavigate();
  const location = useLocation();

  const [query] = useQueryState('q', parseAsString.withDefault(''));
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsStringEnum<TabKey>(['all', 'draft', 'review', 'active']).withDefault('all')
  );

  const q = query.trim().toLowerCase();

  const filtered = (contracts ?? []).filter((c) => {
    const matchQ = !q || c.title.toLowerCase().includes(q);
    const matchTab =
      tab === 'all' ||
      (tab === 'draft' && c.status.toLowerCase() === 'draft') ||
      (tab === 'review' && c.status.toLowerCase() === 'review') ||
      (tab === 'active' && c.status.toLowerCase() === 'active');
    return matchQ && matchTab;
  });

  const tabs: { k: TabKey; label: string }[] = [
    { k: 'all', label: t('main.tabs.all') },
    { k: 'draft', label: t('main.tabs.draft') },
    { k: 'review', label: t('main.tabs.review') },
    { k: 'active', label: t('main.tabs.active') },
  ];

  return (
    <section className="flex-1 space-y-4">
      <ContractMainHeader filteredCount={filtered.length} />

      <ContractMainTabs
        tabs={tabs}
        activeTab={tab}
        primaryColor={config.theme.primaryColor}
        onSelect={(k) => setTab(k)}
      />

      <ContractMainSummary
        filtered={filtered}
        chartColor={config.theme.primaryColor}
        onBarClick={(status) => {
          if (status && status !== 'all') {
            setTab(status as TabKey);
          } else {
            setTab('all');
          }
        }}
        onRowClick={(id) => navigate(`${location.pathname}/${id}`)}
      />

      <ContractMainBody filtered={filtered} ListComponent={ListComponent} />
    </section>
  );
}