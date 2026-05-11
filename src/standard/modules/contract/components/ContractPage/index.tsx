import { useSuspenseQuery } from '@tanstack/react-query';
import { useTenantComponent, useTenantService } from '@/core/hooks/useTenantModule';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { useQueryState, parseAsString, parseAsStringEnum } from 'nuqs';

import { LoadingBar } from '@/core/uikit/feedback/LoadingBar';
import Header from './Header';
import Tabs from './Tabs';
import Summary from './Summary';

type TabKey = 'all' | 'draft' | 'review' | 'active';

type ContractItem = {
  id: number | string;
  title: string;
  status: string;
};

const ContractPageContent = () => {
  const { tenantId, config } = useAppConfig();
  const service = useTenantService('ContractService');

  const { data: contracts } = useSuspenseQuery({
    queryKey: ['contracts', tenantId],
    queryFn: () => service.getContracts(tenantId),
  });

  const { Component: Sidebar } = useTenantComponent('ContractSidebar');
  const { Component: List } = useTenantComponent('ContractList');

  const { t } = useCoreTranslation('contract');
  const navigate = useNavigate();
  const location = useLocation();

  const [query] = useQueryState('q', parseAsString.withDefault(''));
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsStringEnum<TabKey>(['all', 'draft', 'review', 'active']).withDefault('all')
  );

  const q = query.trim().toLowerCase();

  const filtered = (contracts ?? []).filter((c: ContractItem) => {
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
    <div className="flex gap-6 p-6 lg:p-10">
      <Sidebar />
      
      <section className="flex-1 space-y-4">
        <Header filteredCount={filtered.length} />

        <Tabs
          tabs={tabs}
          activeTab={tab}
          primaryColor={config.theme.primaryColor}
          onSelect={(k) => setTab(k)}
        />

        <Summary
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

        <div className="space-y-3">
          {List ? (
            <List contracts={filtered} />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="text-sm text-slate-500">{t('main.list_component_load_failed')}</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const ContractPage = () => (
  <Suspense fallback={<LoadingBar />}>
    <ContractPageContent />
  </Suspense>
);

export default ContractPage;