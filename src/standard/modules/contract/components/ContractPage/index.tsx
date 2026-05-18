import { useTenantComponent } from '@/core/hooks/useTenantModule';
import { Suspense } from 'react';
import { LoadingBar } from '@/core/uikit/feedback/LoadingBar';
import type { StandardContractDto } from '@/standard/modules/contract/services/contract.service';

export type TabKey = 'all' | 'draft' | 'review' | 'active';

export function filterContracts(contracts: StandardContractDto[], query: string, tab: TabKey) {
  const q = query.trim().toLowerCase();
  
  return (contracts ?? []).filter((c) => {
    const matchQ = !q || c.title.toLowerCase().includes(q);
    const matchTab =
      tab === 'all' ||
      (tab === 'draft' && c.status.toLowerCase() === 'draft') ||
      (tab === 'review' && c.status.toLowerCase() === 'review') ||
      (tab === 'active' && c.status.toLowerCase() === 'active');
    return matchQ && matchTab;
  });
}

const ContractPageContent = () => {
  const { Component: Sidebar } = useTenantComponent('ContractSidebar');
  const { Component: Header } = useTenantComponent('ContractHeader');
  const { Component: Tabs } = useTenantComponent('ContractTabs');
  const { Component: List } = useTenantComponent('ContractList');

  return (
    <div className="flex gap-6 p-6 lg:p-10">
      <Suspense fallback={<LoadingBar />}>
        <Sidebar />
      </Suspense>
      
      <section className="flex-1 space-y-4">
        <Suspense fallback={<LoadingBar />}>
          <Header />
        </Suspense>

        <Suspense fallback={<LoadingBar />}>
          <Tabs />
        </Suspense>

        <div className="space-y-3">
          <Suspense fallback={<LoadingBar />}>
            <List />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

const ContractPage = () => (
  <ContractPageContent />
);

export default ContractPage;