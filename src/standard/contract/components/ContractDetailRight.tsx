// src/standard/contract/components/ContractDetailRight.tsx
import { useState } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import type { StandardContractDto } from '@/standard/contract/services/contract.service';

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
  // [변경] 배열 대신 단일 객체나 선택적 객체로 받는 것이 일반적임. (여기선 안 쓰는 contract지만 구조상 유지)
  contract?: StandardContractDto;
}

export default function ContractDetailRight({ contract }: Props) {
  const { config } = useAppConfig();
  const [comment, setComment] = useState('승인합니다.');

  const base = contract ?? { id: '-', title: '계약 상세', status: 'Active' };
  const derived = {
    ...base,
    smartEmail: `licombined+com${String(base.id ?? '0')}@smail.buptlestg.com`,
  };

  return (
    <section className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700">
            날인용 다운로드
          </button>
          <button
            className="flex-1 px-3 py-2 rounded-lg text-sm font-black text-white"
            style={{ backgroundColor: config.theme.primaryColor }}
          >
            날인 확인
          </button>
        </div>
      </div>

      <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open>
        <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
          <div className="font-black text-slate-900">법무팀 공유</div>
          <div className="text-slate-400">⌄</div>
        </summary>
        <div className="px-5 pb-5">
          <div className="text-sm text-slate-500">(데모) 공유 대상/권한 설정 영역입니다.</div>
        </div>
      </details>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="font-black text-slate-900">진행상황</div>
          <button className="text-slate-400 hover:text-slate-900">^</button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="text-sm font-bold text-slate-700">스마트 이메일</div>
            <div className="ml-auto flex items-center gap-2">
              <div className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-slate-700">
                {safeText(derived.smartEmail)}
              </div>
              <button
                className="px-2 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(String(derived.smartEmail ?? ''));
                  } catch {
                    // ignore
                  }
                }}
              >
                copy
              </button>
              <button className="text-xs font-bold text-blue-600 hover:underline">스마트 이메일 보기</button>
            </div>
          </div>
          {/* ... (나머지 UI 코드는 동일) */}
          <div className="pt-2">
            <TimelineItem title="법률_검토자: 검토완료" time="26/01/12 10:26" />
            <TimelineItem title="법률_검토자: 최종승인요청" time="26/01/12 10:26" />
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
                  <input
                    className="w-full px-4 py-3 rounded-xl border border-blue-500 outline-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
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
