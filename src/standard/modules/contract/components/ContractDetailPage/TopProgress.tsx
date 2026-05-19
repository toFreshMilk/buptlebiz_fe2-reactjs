import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useTenantService } from '@/core/hooks/useTenantModule';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import type { StandardContractService } from '@/standard/modules/contract/services/contract.service';

type StepKey = 'draft' | 'review' | 'active' | 'done';

function normalizeStatus(s: string) {
  return (s ?? '').trim().toLowerCase();
}

function statusToStep(status: string): StepKey {
  const s = normalizeStatus(status);
  if (s === 'draft') return 'draft';
  if (s === 'review') return 'review';
  if (s === 'active' || s.includes('sign')) return 'active';
  if (s === 'done' || s === 'completed' || s === 'complete') return 'done';
  return 'active';
}

export default function TopProgress() {
  const { id: contractId } = useParams<{ id: string }>();
  const { tenantId, config } = useAppConfig();
  const { t } = useCoreTranslation('contract');
  const service = useTenantService<StandardContractService>('ContractService');

  const { data } = useSuspenseQuery({
    queryKey: ['contractsDetail', tenantId],
    queryFn: () => service.getContractsDetail(tenantId),
  });

  const contract = data?.find(c => String(c.id) === String(contractId));

  const step = statusToStep(contract?.status ?? '');
  const stepMap: Record<StepKey, number> = { draft: 0, review: 1, active: 2, done: 3 };
  const stepIndex = stepMap[step];

  const statusRaw = contract?.status ?? '';
  const statusNormalized = normalizeStatus(statusRaw);

  const statusLabel = (() => {
    if (!statusNormalized) return t('contractStatus.signPending');
    if (statusNormalized === 'draft') return t('contractStatus.draft');
    if (statusNormalized === 'review') return t('contractStatus.review');
    if (statusNormalized === 'active' || statusNormalized.includes('sign')) return t('contractStatus.active');
    if (statusNormalized === 'approved') return t('contractStatus.approved');
    if (statusNormalized === 'completed' || statusNormalized === 'complete' || statusNormalized === 'done') {
      return t('contractStatus.done');
    }
    return statusRaw || t('contractStatus.signPending');
  })();

  const steps: Array<{ key: StepKey; label: string }> = [
    { key: 'draft', label: t('detailTop.step.draft') },
    { key: 'review', label: t('detailTop.step.review') },
    { key: 'active', label: t('detailTop.step.active') },
    { key: 'done', label: t('detailTop.step.done') },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="text-center font-bold text-slate-900">
          {t('detailTop.contractIs')}
          <span className="text-rose-500">{statusLabel}</span>
          {t('detailTop.statusSuffix')}
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="relative">
          <div className="h-[2px] bg-slate-200" />
          <div
            className="h-[2px] absolute top-0 left-0 transition-all duration-500"
            style={{
              width: `${(stepIndex / 3) * 100}%`,
              backgroundColor: config.theme.primaryColor,
            }}
          />

          <div className="mt-6 grid grid-cols-4 gap-4">
            {steps.map((s, idx) => {
              const active = idx <= stepIndex;
              return (
                <div key={s.key} className="text-center">
                  <div
                    className="mx-auto h-2 w-2 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor: active ? config.theme.primaryColor : '#cbd5e1',
                    }}
                  />
                  <div className={`mt-2 text-sm font-bold ${active ? 'text-slate-900' : 'text-slate-400'}`}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
