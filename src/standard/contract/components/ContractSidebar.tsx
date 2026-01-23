// src/standard/contract/components/ContractSidebar.tsx
import { useSearchParams } from 'react-router-dom';
import Button from '@/uikit/form/Button';
import Input from '@/uikit/form/Input';
import { useAppConfig } from '@/core/hooks/useAppConfig';

export default function ContractSidebar() {
  const { config } = useAppConfig();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';

  const updateParams = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  };

  return (
    <aside className="w-72 shrink-0 space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="text-lg font-black text-slate-900 mb-3">계약</div>
        <Button
          className="w-full"
          style={{ backgroundColor: config.theme.primaryColor }}
          onClick={() => alert('새 계약 작성 (데모)')}
        >
          계약 생성
        </Button>

        <div className="mt-4">
          <Input
            label="계약명"
            value={query}
            onChange={(e) => updateParams('q', e.target.value)}
            placeholder="검색어를 입력하세요"
          />
        </div>

        <button
          className="mt-3 w-full py-2 rounded-lg border border-slate-200 bg-amber-300 font-bold"
          onClick={() => setSearchParams({})}
        >
          검색 초기화
        </button>
      </div>

      {/* ... (카테고리 영역 동일) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-slate-900">카테고리</div>
          <button className="text-slate-400 hover:text-slate-900">⚙</button>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          {['전체', '회사 템플릿', '마케팅/홍보 계약', '테스트용도', '보안'].map((label) => (
            <button
              key={label}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
              onClick={() => alert(`카테고리: ${label} (데모)`)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
