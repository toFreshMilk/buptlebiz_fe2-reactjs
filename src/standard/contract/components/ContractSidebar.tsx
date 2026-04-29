import { useState } from 'react';
import { Button } from '@/uikit/form/Button';
import { Input } from '@/uikit/form/Input';
import { Select } from '@/uikit/form/Select';
import Modal from '@/uikit/layout/Modal';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

function buildUrl(pathname: string, params: URLSearchParams) {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export default function ContractSidebar() {
  const { config } = useAppConfig();
  const { t } = useCoreTranslation('contract');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const query = searchParams.get('q') ?? '';
  const tab = searchParams.get('tab') ?? 'all';
  const tabOptions = [
    { label: t('sidebar.tab.all', { defaultValue: '전체' }), value: 'all' },
    { label: t('sidebar.tab.draft', { defaultValue: '초안' }), value: 'draft' },
    { label: t('sidebar.tab.review', { defaultValue: '검토' }), value: 'review' },
    { label: t('sidebar.tab.active', { defaultValue: '진행' }), value: 'active' },
  ];

  return (
    <aside className="w-72 shrink-0 space-y-4">
      <Modal
        open={createModalOpen}
        title={t('sidebar.createModal.title', { defaultValue: '계약 생성' })}
        message={t('sidebar.createModal.message', { defaultValue: '새 계약 작성 플로우를 시작합니다. (데모)' })}
        variant="single"
        confirmText={t('sidebar.createModal.confirm', { defaultValue: '확인' })}
        onConfirm={() => setCreateModalOpen(false)}
        onClose={() => setCreateModalOpen(false)}
        uniqueClassName="ui-standard-create-modal"
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="text-lg font-black text-slate-900 mb-3">{t('sidebar.title', { defaultValue: '계약' })}</div>
        <Button
          fullWidth
          tone="slate"
          uniqueClassName="ui-standard-contract-create"
          style={{ backgroundColor: config.theme.primaryColor }}
          onPress={() => setCreateModalOpen(true)}
        >
          {t('sidebar.btnCreate', { defaultValue: '계약 생성' })}
        </Button>

        <div className="mt-4">
          <Input
            label={t('sidebar.searchLabel', { defaultValue: '계약명' })}
            value={query}
            onValueChange={(v) => {
              const next = new URLSearchParams(searchParams.toString());
              if (v) next.set('q', v);
              else next.delete('q');
              if (!next.get('tab')) next.set('tab', tab);
              navigate(buildUrl(location.pathname, next), { replace: true });
            }}
            placeholder={t('sidebar.searchPlaceholder', { defaultValue: '검색어를 입력하세요' })}
          />
        </div>

        <div className="mt-3">
          <Select
            label={t('sidebar.statusLabel', { defaultValue: '상태' })}
            value={tab}
            options={tabOptions}
            onValueChange={(value) => {
              const next = new URLSearchParams(searchParams.toString());
              next.set('tab', value);
              navigate(buildUrl(location.pathname, next), { replace: true });
            }}
          />
        </div>

        <div className="mt-3">
          <Button
            fullWidth
            tone="amber"
            uniqueClassName="ui-standard-contract-reset"
            onPress={() => {
              const next = new URLSearchParams(searchParams.toString());
              next.delete('q');
              next.delete('tab');
              navigate(buildUrl(location.pathname, next), { replace: true });
            }}
          >
            {t('sidebar.resetFilter', { defaultValue: '검색 초기화' })}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-slate-900">{t('sidebar.category', { defaultValue: '카테고리' })}</div>
          <Button variant="ghost" size="icon" tone="slate" uniqueClassName="ui-standard-category-setting">
            ⚙
          </Button>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          {[
            t('sidebar.categoryOptions.all', { defaultValue: '전체' }),
            t('sidebar.categoryOptions.company', { defaultValue: '회사 템플릿' }),
            t('sidebar.categoryOptions.marketing', { defaultValue: '마케팅/홍보 계약' }),
            t('sidebar.categoryOptions.test', { defaultValue: '테스트용도' }),
            t('sidebar.categoryOptions.security', { defaultValue: '보안' })
          ].map((label, index) => (
            <Button
              key={label}
              fullWidth
              variant="ghost"
              tone="slate"
              align="start"
              uniqueClassName={`ui-standard-category-${index}`}
              onPress={() => alert(`${t('sidebar.category', { defaultValue: '카테고리' })}: ${label}`)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}