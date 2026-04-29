import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import type { StandardContractDto } from '@/standard/contract/services/contract.service';
import { Button } from '@/uikit/form/Button';
import { Input } from '@/uikit/form/Input';
import { Checkbox } from '@/uikit/form/Checkbox';
import { DatePicker } from '@/uikit/calendar/DatePicker';
import { BarChart } from '@/uikit/chart/BarChart';

function safeText(v?: string) {
  return v && String(v).trim() ? v : '-';
}

function TimelineItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500">
          ▦
        </div>
        <div className="flex-1 w-px bg-slate-200 mt-1" />
      </div>
      <div className="pt-1 pb-6">
        <div className="text-sm font-bold text-slate-900">{title}</div>
        <div className="text-xs text-slate-400 mt-1">{time}</div>
      </div>
    </div>
  );
}

interface Props {
  data: StandardContractDto[];
}

type WeeklyActivity = {
  week: string;
  comments: number;
  files: number;
};

export default function ContractDetailRight({ data }: Props) {
  const { config } = useAppConfig();

  const contract = data?.[0] || null;

  const base = contract ?? { id: '-', title: '계약 상세', status: 'Active' };

  const defaultSignDate =
    typeof base.signDate === 'string' && !Number.isNaN(new Date(base.signDate).getTime()) ? new Date(base.signDate) : undefined;
  const defaultReviewFrom =
    typeof base.reviewFrom === 'string' && !Number.isNaN(new Date(base.reviewFrom).getTime()) ? new Date(base.reviewFrom) : undefined;
  const defaultReviewTo =
    typeof base.reviewTo === 'string' && !Number.isNaN(new Date(base.reviewTo).getTime()) ? new Date(base.reviewTo) : undefined;

  const weeklyActivityData: WeeklyActivity[] = Array.isArray(base.weeklyActivity) && base.weeklyActivity.length > 0 ? base.weeklyActivity : [];
  const timeline = Array.isArray(base.timeline) ? base.timeline : [];

  const [comment, setComment] = useState('승인합니다.');
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
    <section className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex gap-2">
          <Button fullWidth variant="outline" tone="slate" uniqueClassName="ui-standard-right-download">
            날인용 다운로드
          </Button>
          <Button fullWidth tone="slate" uniqueClassName="ui-standard-right-stamp-check" style={{ backgroundColor: config.theme.primaryColor }}>
            날인 확인
          </Button>
        </div>
      </div>

      <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open>
        <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
          <div className="font-black text-slate-900">법무팀 공유</div>
          <div className="text-slate-400">⌄</div>
        </summary>
        <div className="px-5 pb-5">
          <div className="text-sm text-slate-500">공유 대상/권한 설정 영역입니다.</div>
        </div>
      </details>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
        <div className="text-sm font-black text-slate-900">서명/검토 일정 (DatePicker 샘플)</div>
        <DatePicker
          mode="single"
          label="서명 예정일"
          description="단일 날짜 선택"
          value={signDate}
          onValueChange={setSignDate}
          onDayClick={(day) => {
            console.log('[DatePicker] sign date selected:', day);
          }}
        />
        <DatePicker
          mode="range"
          label="검토 기간"
          description="기간 선택"
          value={reviewRange}
          onValueChange={setReviewRange}
          numberOfMonths={1}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="text-sm font-black text-slate-900 mb-2">주간 활동량 (Recharts 샘플)</div>
        <BarChart
          data={weeklyActivityData}
          xKey="week"
          series={[
            { dataKey: 'comments', name: '코멘트', color: config.theme.primaryColor },
            { dataKey: 'files', name: '첨부파일', color: '#f59e0b' },
          ]}
          height={220}
          onBarClick={({ seriesKey, row }) => {
            console.log('[BarChart] click', seriesKey, row.week);
          }}
          emptyFallback={<div className="text-sm text-slate-400">활동 데이터가 없습니다.</div>}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="font-black text-slate-900">진행상황</div>
          <Button variant="ghost" tone="slate" size="icon" uniqueClassName="ui-standard-right-collapse">
            ^
          </Button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="text-sm font-bold text-slate-700">스마트 이메일</div>
            <div className="ml-auto flex items-center gap-2">
              <div className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-slate-700">
                    {safeText(base.smartEmail)}
              </div>
              <Button
                variant="outline"
                tone="slate"
                size="sm"
                uniqueClassName="ui-standard-right-copy"
                onPress={async () => {
                  try {
                    await navigator.clipboard.writeText(String(base.smartEmail ?? ''));
                  } catch {
                    // ignore
                  }
                }}
              >
                copy
              </Button>
              <Button variant="ghost" tone="blue" size="sm" align="start" uniqueClassName="ui-standard-right-smart-mail">
                스마트 이메일 보기
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" tone="slate" uniqueClassName="ui-standard-right-workflow">
              워크플로우 설정
            </Button>
            <Button tone="blue" uniqueClassName="ui-standard-right-compare">
              계약서 비교보기
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-600">
            <Checkbox label="계약 수정 내역" />
            <Checkbox label="첨부파일" />
            <Checkbox label="코멘트" />
          </div>

          <div className="pt-2">
            {timeline.map((item, index) => (
              <TimelineItem key={`${item.title}-${item.time}-${index}`} title={item.title} time={item.time} />
            ))}
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500">
                  ▦
                </div>
              </div>
              <div className="pt-1 w-full">
                <div className="text-sm font-bold text-slate-900">법률_최종승인자: 최종승인</div>
                <div className="text-xs text-slate-400 mt-1">26/01/12 10:26</div>
                <div className="mt-3">
                  <Input
                    tone="blue"
                    inputSize="lg"
                    shape="xl"
                    uniqueClassName="ui-standard-right-comment"
                    value={comment}
                    onValueChange={setComment}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}