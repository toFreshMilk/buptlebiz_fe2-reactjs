import { useParams } from 'react-router-dom';
import type { StandardContractDto } from '@/standard/modules/contract/services/contract.service';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

function formatAmount(v?: string) {
  if (!v) return '-';
  return v;
}

function safeText(v?: string) {
  return v && String(v).trim() ? v : '-';
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="font-black text-slate-900">{title}</div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-3 border-b border-slate-100 last:border-b-0">
      <div className="text-sm font-bold text-slate-500">{label}</div>
      <div className="col-span-2 text-sm text-slate-900">{value}</div>
    </div>
  );
}

interface Props {
  data: StandardContractDto[];
}

export default function Left({ data }: Props) {
  const { t } = useCoreTranslation('contract');
  const params = useParams<{ lang: string; id: string }>();
  const contractId = params?.id;

  const contract = (data ?? []).find((r) => String(r.id) === String(contractId)) || null;

  const base = contract ?? {
    id: contractId ?? '-',
    title: t('detailLeft.titleFallback'),
    status: 'Active',
  };

  const derived = {
    ...base,
    partner: base.partner ?? 'Apple',
    category: base.category ?? t('detailLeft.fallback.category'),
    templateName: base.templateName ?? t('detailLeft.fallback.template'),
    requester: base.requester ?? t('detailLeft.fallback.requester'),
    reviewer: base.reviewer ?? t('detailLeft.fallback.reviewer'),
    documentCode: base.documentCode ?? '-',
    date: base.date ?? '26/01/12',
    amount: base.amount ?? '231,213',
  };

  return (
    <section className="space-y-4">
      <Card title={t('detailLeft.basicInfo')}>
        <div>
          <InfoRow label={t('detailLeft.requester')} value={safeText(derived.requester)} />
          <InfoRow label={t('detailLeft.partner')} value={safeText(derived.partner)} />
          <InfoRow label={t('detailLeft.category')} value={safeText(derived.category)} />
          <InfoRow label={t('detailLeft.templateName')} value={safeText(derived.templateName)} />
          <InfoRow label={t('detailLeft.reviewer')} value={safeText(derived.reviewer)} />
          <InfoRow
            label={t('detailLeft.amount')}
            value={
              <span className="font-bold">
                {formatAmount(derived.amount)} <span className="text-slate-400 text-xs">KRW</span>
              </span>
            }
          />
          <InfoRow label={t('detailLeft.documentCode')} value={safeText(derived.documentCode)} />
          <InfoRow label={t('detailLeft.documentStatus')} value="-" />
        </div>
      </Card>

      <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open>
        <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
          <div className="font-black text-slate-900">{t('detailLeft.userInfo')}</div>
          <div className="text-slate-400">⌄</div>
        </summary>
        <div className="px-5 pb-5">
          <div className="text-sm text-slate-500">
            {t('detailLeft.userInfoDesc')}
          </div>
        </div>
      </details>

      <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
          <div className="font-black text-slate-900">{t('detailLeft.miscInfo')}</div>
          <div className="text-slate-400">⌄</div>
        </summary>
        <div className="px-5 pb-5">
          <div className="text-sm text-slate-500">{t('detailLeft.miscInfoDesc')}</div>
        </div>
      </details>

      <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open>
        <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
          <div className="font-black text-slate-900">{t('detailLeft.contractDoc')}</div>
          <div className="text-slate-400">⌄</div>
        </summary>
        <div className="px-5 pb-5">
          <div className="text-sm text-slate-500">{t('detailLeft.contractDocDesc')}</div>
        </div>
      </details>
    </section>
  );
}