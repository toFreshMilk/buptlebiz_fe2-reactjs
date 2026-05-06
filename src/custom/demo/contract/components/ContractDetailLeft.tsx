import { useParams } from 'react-router-dom';
import type { StandardContractDto } from '@/standard/contract/services/contract.service';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { OnlyofficeEditor } from '@/uikit/editor/OnlyofficeEditor';

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

export default function DemoContractDetailLeft({ data }: Props) {
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

  // 임시 스태틱 데이터 (실제로는 백엔드에서 받아와야 함)
  const docConfig = {
    document: {
      fileType: 'docx',
      key: `demo-contract-${contractId}-${Date.now()}`,
      title: `${derived.title}.docx`,
      url: 'https://static.onlyoffice.com/assets/docs/samples/demo.docx', // 공식 제공 테스트 샘플 문서 URL
    },
    documentType: 'word',
    editorConfig: {
      mode: 'edit' as const,
      lang: 'ko-KR',
      user: {
        id: 'demo-user-1',
        name: 'Demo Admin',
      },
    },
  };

  // 공개 테스트용 도큐먼트 서버 -> 기존 시스템 스테이징 서버
  const documentServerUrl = 'https://util.buptlestg.com:30443/';

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
          <div className="font-black text-slate-900">계약서 본문 (ONLYOFFICE Demo)</div>
          <div className="text-slate-400">⌄</div>
        </summary>
        <div className="px-5 pb-5">
          <OnlyofficeEditor documentServerUrl={documentServerUrl} config={docConfig} height="800px" />
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
    </section>
  );
}