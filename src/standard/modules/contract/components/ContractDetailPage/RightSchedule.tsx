import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { DateRange } from 'react-day-picker';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useTenantService } from '@/core/hooks/useTenantModule';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { DatePicker } from '@/core/uikit/calendar/DatePicker';
import type { StandardContractService } from '@/standard/modules/contract/services/contract.service';

export default function RightSchedule() {
  const { t } = useCoreTranslation('contract');
  const params = useParams<{ lang: string; id: string }>();
  const contractId = params?.id;
  
  const { tenantId } = useAppConfig();
  const service = useTenantService<StandardContractService>('ContractService');

  const { data } = useSuspenseQuery({
    queryKey: ['contractsDetail2', tenantId],
    queryFn: () => service.getContractsDetail2(tenantId),
  });

  const contract = data?.find((r) => String(r.id) === String(contractId)) || data?.[0] || null;
  const base = contract ?? {
    id: '-',
    title: t('detailLeft.titleFallback'),
    status: 'Active',
  };

  const defaultSignDate =
    typeof base.signDate === 'string' && !Number.isNaN(new Date(base.signDate).getTime())
      ? new Date(base.signDate)
      : undefined;
  const defaultReviewFrom =
    typeof base.reviewFrom === 'string' && !Number.isNaN(new Date(base.reviewFrom).getTime())
      ? new Date(base.reviewFrom)
      : undefined;
  const defaultReviewTo =
    typeof base.reviewTo === 'string' && !Number.isNaN(new Date(base.reviewTo).getTime())
      ? new Date(base.reviewTo)
      : undefined;

  const [signDate, setSignDate] = useState<Date | undefined>(defaultSignDate);
  const [reviewRange, setReviewRange] = useState<DateRange | undefined>(
    defaultReviewFrom
      ? {
          from: defaultReviewFrom,
          to: defaultReviewTo,
        }
      : undefined,
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
      <div className="text-sm font-black text-slate-900">{t('detailRight.schedule')}</div>
      <DatePicker
        mode="single"
        label={t('detailRight.signDate')}
        description={t('detailRight.signDateDesc')}
        value={signDate}
        onValueChange={setSignDate}
        onDayClick={(day) => {
          console.log('[DatePicker] sign date selected:', day);
        }}
      />
      <DatePicker
        mode="range"
        label={t('detailRight.reviewRange')}
        description={t('detailRight.reviewRangeDesc')}
        value={reviewRange}
        onValueChange={setReviewRange}
        numberOfMonths={1}
      />
    </div>
  );
}
