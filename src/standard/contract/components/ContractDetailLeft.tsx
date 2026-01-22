// src/standard/contract/components/ContractDetailLeft.tsx
import type { StandardContractDto } from '@/standard/contract/services/contract.service';

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
    contract: StandardContractDto; // [변경] 단일 객체 받도록 수정 (Page에서 find해서 넘겨주므로)
}

export default function ContractDetailLeft({ contract }: Props) {
    // Page에서 이미 데이터를 찾아서 넘겨주므로 여기서 useParams로 다시 찾을 필요 없음
    // 하지만 안전장치로 null check

    const base = contract ?? {
        id: '-',
        title: '계약 상세',
        status: 'Active',
    };

    const derived = {
        ...base,
        partner: base.partner ?? 'Apple',
        category: base.category ?? '테스트',
        templateName: base.templateName ?? '법률QA체결계약서',
        requester: base.requester ?? '법률_생성자',
        reviewer: base.reviewer ?? '법률_검토자',
        documentCode: base.documentCode ?? '-',
        date: base.date ?? '26/01/12',
        amount: base.amount ?? '231,213',
    };

    return (
        <section className="space-y-4">
            <Card title="기본정보">
                <div>
                    <InfoRow label="기안자" value={safeText(derived.requester)} />
                    <InfoRow label="계약 상대방" value={safeText(derived.partner)} />
                    <InfoRow label="카테고리" value={safeText(derived.category)} />
                    <InfoRow label="템플릿명" value={safeText(derived.templateName)} />
                    <InfoRow label="검토자" value={safeText(derived.reviewer)} />
                    <InfoRow
                        label="계약금액"
                        value={
                            <span className="font-bold">
                {formatAmount(derived.amount)} <span className="text-slate-400 text-xs">KRW</span>
              </span>
                        }
                    />
                    <InfoRow label="전자결재 문서코드" value={safeText(derived.documentCode)} />
                    <InfoRow label="전자결재 진행상태" value="-" />
                </div>
            </Card>

            <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open>
                <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
                    <div className="font-black text-slate-900">유저정보</div>
                    <div className="text-slate-400">⌄</div>
                </summary>
                <div className="px-5 pb-5">
                    <div className="text-sm text-slate-500">
                        (데모) 유저정보 영역입니다. 실제 필드는 서비스 연동 시 채워집니다.
                    </div>
                </div>
            </details>

            <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
                    <div className="font-black text-slate-900">기타 정보</div>
                    <div className="text-slate-400">⌄</div>
                </summary>
                <div className="px-5 pb-5">
                    <div className="text-sm text-slate-500">(데모) 기타 정보 영역입니다.</div>
                </div>
            </details>

            <details className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open>
                <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between">
                    <div className="font-black text-slate-900">계약서</div>
                    <div className="text-slate-400">⌄</div>
                </summary>
                <div className="px-5 pb-5">
                    <div className="text-sm text-slate-500">(데모) 계약서 본문/첨부 영역입니다.</div>
                </div>
            </details>
        </section>
    );
}
