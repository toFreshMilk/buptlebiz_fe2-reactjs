import type { ColumnDef } from '@tanstack/react-table';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { Button } from '@/core/uikit/form/Button';
import { BarChart } from '@/core/uikit/chart/BarChart';
import { DataTable } from '@/core/uikit/table/DataTable';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTenantComponent, useTenantService } from '@/core/hooks/useTenantModule';
import { Suspense } from 'react';
import { LoadingBar } from '@/core/uikit/feedback/LoadingBar';

function normalizeStatus(s: string) {
  return (s ?? '').trim().toLowerCase();
}

type ContractItem = {
  id: number | string;
  title: string;
  status: string;
};

function StatCard({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-white shadow-sm p-4">
      <div className="text-xs font-black tracking-[0.2em] text-rose-500">{label}</div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-3xl font-black text-slate-900">{value}</div>
        <div className="h-2 w-20 rounded-full" style={{ backgroundColor: accent, opacity: 0.35 }} />
      </div>
    </div>
  );
}

function Column({
  title,
  hint,
  items,
  chip,
  emptyText,
  statusLabel,
  onRowClick,
}: {
  title: string;
  hint: string;
  items: ContractItem[];
  chip: { bg: string; text: string; border: string };
  emptyText: string;
  statusLabel: string;
  onRowClick: (id: string) => void;
}) {
  return (
    <section className="min-w-[280px] flex-1 rounded-2xl border border-rose-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-rose-100 flex items-center justify-between">
        <div>
          <div className="text-sm font-black text-slate-900">{title}</div>
          <div className="text-xs text-slate-500">{hint}</div>
        </div>
        <span className={`text-xs font-black px-2 py-1 rounded-full border ${chip.bg} ${chip.text} ${chip.border}`}>
          {items.length}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-slate-500">{emptyText}</div>
        ) : (
          items.map((c) => (
            <div
              key={String(c.id)}
              onClick={() => onRowClick(String(c.id))}
              className="block rounded-xl border border-rose-100 bg-rose-50/40 p-3 hover:bg-rose-50 transition cursor-pointer"
            >
              <div className="text-xs font-black text-rose-700">#{c.id}</div>
              <div className="mt-1 font-bold text-slate-900 leading-snug">{c.title}</div>
              <div className="mt-2 text-[11px] font-black text-slate-500">
                {statusLabel}: <span className="text-slate-800">{c.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

const ContractPageContent = () => {
  const { tenantId, config } = useAppConfig();
  const service = useTenantService('ContractService');

  const { Component: Sidebar } = useTenantComponent('ContractSidebar');

  const { t } = useCoreTranslation('contract');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const query = (searchParams.get('q') ?? '').trim().toLowerCase();
  const tab = (searchParams.get('tab') ?? 'all').toLowerCase();

  const { data } = useSuspenseQuery({
    queryKey: ['contracts', tenantId, query, tab],
    queryFn: () => service.getContracts(tenantId, query, tab),
  });

  const filtered = data?.items || [];

  const active = filtered.filter((c: ContractItem) => normalizeStatus(c.status) === 'active');
  const review = filtered.filter((c: ContractItem) => normalizeStatus(c.status) === 'review');
  const draft = filtered.filter((c: ContractItem) => normalizeStatus(c.status) === 'draft');

  const emptyText = t('apr.columns.empty');
  const statusLabel = t('apr.card.status_label');

  const statusChartData = [
    { status: 'Draft', count: draft.length },
    { status: 'Review', count: review.length },
    { status: 'Active', count: active.length },
  ];

  const tableColumns: Array<ColumnDef<ContractItem, unknown>> = [
    {
      accessorKey: 'id',
      header: t('list.header.id'),
    },
    {
      accessorKey: 'title',
      header: t('list.header.title'),
    },
    {
      accessorKey: 'status',
      header: t('list.header.status'),
    },
  ];

  return (
    <div className="flex gap-6 p-6 lg:p-10">
      <Sidebar />
      <section className="flex-1 space-y-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label={t('apr.stat.total')} value={filtered.length} accent={config.theme.primaryColor} />
          <StatCard label={t('apr.stat.active')} value={active.length} accent="#16a34a" />
          <StatCard label={t('apr.stat.review')} value={review.length} accent="#f59e0b" />
          <StatCard label={t('apr.stat.draft')} value={draft.length} accent="#64748b" />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <Column
            title={t('apr.columns.review.title')}
            hint={t('apr.columns.review.hint')}
            items={review}
            emptyText={emptyText}
            statusLabel={statusLabel}
            onRowClick={(id) => navigate(`${location.pathname}/${id}`)}
            chip={{
              bg: 'bg-amber-50',
              text: 'text-amber-800',
              border: 'border-amber-200',
            }}
          />
          <Column
            title={t('apr.columns.active.title')}
            hint={t('apr.columns.active.hint')}
            items={active}
            emptyText={emptyText}
            statusLabel={statusLabel}
            onRowClick={(id) => navigate(`${location.pathname}/${id}`)}
            chip={{
              bg: 'bg-emerald-50',
              text: 'text-emerald-800',
              border: 'border-emerald-200',
            }}
          />
          <Column
            title={t('apr.columns.draft.title')}
            hint={t('apr.columns.draft.hint')}
            items={draft}
            emptyText={emptyText}
            statusLabel={statusLabel}
            onRowClick={(id) => navigate(`${location.pathname}/${id}`)}
            chip={{
              bg: 'bg-slate-50',
              text: 'text-slate-700',
              border: 'border-slate-200',
            }}
          />
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
