// src/standard/contract/components/ContractDetailTop.tsx
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useTenantService } from '@/core/hooks/useTenantModule';
import type { IContractService, StandardContractDto } from '@/standard/contract/services/contract.service';

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

function getStatusLabel(status: string) {
    const s = normalizeStatus(status);
    if (!s) return '서명/날인대기';
    if (s === 'draft') return '초안';
    if (s === 'review') return '검토';
    if (s === 'active') return '서명/날인대기';
    if (s === 'completed' || s === 'complete' || s === 'done') return '완료';
    return status ?? '서명/날인대기';
}

interface Props {
    contract: StandardContractDto;
}

export default function ContractDetailTop({ contract }: Props) {
    const navigate = useNavigate();
    const { config } = useAppConfig();
    const queryClient = useQueryClient();
    const { tenantId } = useAppConfig();

    // 서비스 인스턴스 가져오기 (이미 상위 페이지에서 로드되었으므로 캐시된 것 사용 가능)
    // 실제로는 useTenantService로 다시 가져와도 되고, Props로 서비스 메서드만 넘겨받아도 됨.
    // 여기서는 훅 재사용.
    const { service } = useTenantService<IContractService>('ContractService');

    // [변경] Next.js Server Action -> React Query Mutation
    const mutation = useMutation({
        mutationFn: async () => {
            if (!service) throw new Error('Service not loaded');
            // service 인스턴스는 이미 tenantId를 가지고 있음
            await service.approve(String(contract.id));
        },
        onSuccess: () => {
            // 데이터 갱신
            queryClient.invalidateQueries({ queryKey: ['contract', tenantId] });
            alert('승인되었습니다.');
        },
        onError: (err) => {
            alert(`오류 발생: ${(err as Error).message}`);
        },
    });

    const step = statusToStep(contract?.status ?? '');
    const stepMap = { draft: 0, review: 1, active: 2, done: 3 };
    const stepIndex = stepMap[step];

    const title = contract?.title ?? '계약 상세';
    const statusLabel = getStatusLabel(contract?.status ?? '');

    const steps = [
        { key: 'draft', label: '초안' },
        { key: 'review', label: '검토' },
        { key: 'active', label: '서명 및 회수' },
        { key: 'done', label: '완료' },
    ];

    return (
        <section className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 min-w-0">
                    <button
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
                        onClick={() => navigate(-1)}
                    >
                        <span aria-hidden>←</span>
                        <span>목록으로</span>
                    </button>

                    <div className="flex items-center gap-3 min-w-0">
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight truncate">{title}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {/* 승인 버튼 (상태가 APPROVED가 아닐 때만 표시) */}
                    {contract.status !== 'APPROVED' && (
                        <button
                            onClick={() => mutation.mutate()}
                            disabled={mutation.isPending}
                            className="px-3 py-2 rounded-lg border border-blue-200 bg-blue-600 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {mutation.isPending ? '처리중...' : '승인하기'}
                        </button>
                    )}

                    <button className="px-3 py-2 rounded-lg border border-slate-200 bg-amber-300 font-bold text-slate-900">
                        삭제하기
                    </button>
                    <button className="px-3 py-2 rounded-lg border border-rose-200 bg-rose-500 font-bold text-white">
                        계약 종료
                    </button>
                </div>
            </div>

            {/* 성공/에러 메시지 표시는 alert로 대체하거나 별도 UI state로 관리 */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                    <div className="text-center font-bold text-slate-900">
                        본 계약은 <span className="text-rose-500">{statusLabel}</span> 상태입니다.
                    </div>
                </div>

                <div className="px-6 py-6">
                    <div className="relative">
                        <div className="h-[2px] bg-slate-200" />
                        <div
                            className="h-[2px] absolute top-0 left-0"
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
                                            className="mx-auto h-2 w-2 rounded-full"
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
