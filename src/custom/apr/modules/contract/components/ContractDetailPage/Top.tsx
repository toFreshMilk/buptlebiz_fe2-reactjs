import { useState, useEffect, useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import contractService from '@/custom/apr/modules/contract/services/contract.service';
import { type StandardContractDto } from '@/standard/modules/contract/services/contract.service';
import { Button } from '@/core/uikit/form/Button';
import Modal from '@/core/uikit/feedback/Modal';

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

interface Props {
  data: StandardContractDto[];
  contractId: string;
}

export default function Top({ data, contractId }: Props) {
  const contract = data?.find((c) => String(c.id) === String(contractId));
  const navigate = useNavigate();
  const { tenantId, config } = useAppConfig();
  const { t } = useCoreTranslation('contract');
  const [approveModalOpen, setApproveModalOpen] = useState(false);

  const step = statusToStep(contract?.status ?? '');

  const stepMap: Record<StepKey, number> = { draft: 0, review: 1, active: 2, done: 3 };
  const stepIndex = stepMap[step];

  const title = contract?.title ?? t('detailTop.titleFallback');

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

  const [state, submitApprove, isPending] = useActionState(async () => {
    try {
      if (!contractId) throw new Error('Contract ID is missing');
      await contractService.approve(tenantId, contractId);
      return { success: true, ts: Date.now() };
    } catch (error: any) {
      return { error: error.message, ts: Date.now() };
    }
  }, null);

  useEffect(() => {
    if (state?.success) {
      alert(t('detailTop.approvedAlert'));
      navigate('.', { replace: true });
    } else if (state?.error) {
      alert(t('detailTop.approveFailedAlert', { message: state.error }));
    }
  }, [state, navigate, t]);

  const onApproveClick = () => {
    setApproveModalOpen(true);
  };

  return (
    <section className="space-y-4">
      <Modal
        open={approveModalOpen}
        title={t('detailTop.approve')}
        message={t('detailTop.confirmApprove', { title })}
        variant="double"
        confirmText={t('detailTop.approve')}
        onConfirm={() => {
          setApproveModalOpen(false);
          submitApprove();
        }}
        onCancel={() => setApproveModalOpen(false)}
        onClose={() => setApproveModalOpen(false)}
        uniqueClassName="ui-apr-approve-modal"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <Button
            variant="ghost"
            tone="slate"
            size="sm"
            align="start"
            uniqueClassName="ui-apr-detail-top-back"
            onPress={() => navigate('..')}
          >
            <span aria-hidden>←</span>
            <span>{t('detailTop.backToList')}</span>
          </Button>

          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight truncate">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {normalizeStatus(contract?.status ?? '') !== 'approved' && (
            <form
              action={submitApprove}
              onSubmit={(e) => {
                e.preventDefault();
                onApproveClick();
              }}
            >
              <Button
                type="submit"
                disabled={isPending || !contractId}
                tone="blue"
                uniqueClassName="ui-apr-detail-top-approve"
              >
                {isPending ? t('detailTop.processing') : t('detailTop.approve')}
              </Button>
            </form>
          )}

          <Button tone="amber" uniqueClassName="ui-apr-detail-top-delete">
            {t('detailTop.delete')}
          </Button>
          <Button tone="rose" uniqueClassName="ui-apr-detail-top-terminate">
            {t('detailTop.terminate')}
          </Button>
        </div>
      </div>

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
    </section>
  );
}
