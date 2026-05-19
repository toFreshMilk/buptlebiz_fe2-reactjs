import { useState, useEffect, useActionState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useTenantService } from '@/core/hooks/useTenantModule';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { Button } from '@/core/uikit/form/Button';
import Modal from '@/core/uikit/feedback/Modal';
import type { StandardContractService } from '@/standard/modules/contract/services/contract.service';

function normalizeStatus(s: string) {
  return (s ?? '').trim().toLowerCase();
}

export default function Top() {
  const { id: contractId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tenantId } = useAppConfig();
  const { t } = useCoreTranslation('contract');
  const service = useTenantService<StandardContractService>('ContractService');

  const { data } = useSuspenseQuery({
    queryKey: ['contractsDetail', tenantId],
    queryFn: () => service.getContractsDetail(tenantId),
  });

  const contract = data?.find((c) => String(c.id) === String(contractId));
  const [approveModalOpen, setApproveModalOpen] = useState(false);

  const title = contract?.title ?? t('detailTop.titleFallback');
  const statusNormalized = normalizeStatus(contract?.status ?? '');

  const [state, submitApprove, isPending] = useActionState(async () => {
    try {
      if (!contractId) throw new Error('계약 ID가 누락되었습니다.');
      await service.approve(tenantId, contractId);
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
          {statusNormalized !== 'approved' && (
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
    </section>
  );
}
