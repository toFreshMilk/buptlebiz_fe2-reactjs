import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTenantService } from '@/core/hooks/useTenantModule';

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

const Board = () => {
  const { tenantId, config } = useAppConfig();
  const service = useTenantService('ContractService');

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

  return (
    <>
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
    </>
  );
};

export default Board;
