import { useState } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { Button } from '@/uikit/form/Button';
import { Input } from '@/uikit/form/Input';
import { Select } from '@/uikit/form/Select';
import Modal from '@/uikit/feedback/Modal';

function buildUrl(pathname: string, params: URLSearchParams) {
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export default function AprContractSidebar() {
  const { config } = useAppConfig();
  const { t } = useCoreTranslation('contract');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const query = searchParams.get('q') ?? '';
  const tab = searchParams.get('tab') ?? 'all';
  const tabOptions = [
    { label: t('sidebar.tab.all'), value: 'all' },
    { label: t('sidebar.tab.draft'), value: 'draft' },
    { label: t('sidebar.tab.review'), value: 'review' },
    { label: t('sidebar.tab.active'), value: 'active' },
  ];

  return (
    <aside className="w-72 shrink-0 space-y-4">
      <Modal
        open={createModalOpen}
        title={t('sidebar.createModal.title')}
        message={t('sidebar.createModal.message')}
        variant="single"
        onConfirm={() => setCreateModalOpen(false)}
        onClose={() => setCreateModalOpen(false)}
        uniqueClassName="ui-apr-create-modal"
      />

      <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-black text-rose-700">{t('sidebar.title')}</div>
          <span className="text-[10px] font-black px-2 py-1 rounded-full border border-rose-200 bg-rose-50 text-rose-700">
            {t('apr.badge')}
          </span>
        </div>

        <Button
          fullWidth
          tone="slate"
          size="md"
          uniqueClassName="ui-apr-contract-create"
          style={{ backgroundColor: config.theme.primaryColor }}
          onPress={() => setCreateModalOpen(true)}
        >
          {t('sidebar.btnCreate')}
        </Button>

        <div className="mt-4">
          <Input
            label={t('sidebar.searchLabel')}
            value={query}
            tone="rose"
            shape="xl"
            uniqueClassName="ui-apr-contract-search"
            onValueChange={(v) => {
              const next = new URLSearchParams(searchParams.toString());
              if (v) next.set('q', v);
              else next.delete('q');
              if (!next.get('tab')) next.set('tab', tab);
              navigate(buildUrl(location.pathname, next), { replace: true });
            }}
            placeholder={t('sidebar.searchPlaceholder')}
          />
        </div>

        <div className="mt-3">
          <Select
            label={t('sidebar.statusLabel')}
            value={tab}
            options={tabOptions}
            tone="rose"
            shape="xl"
            uniqueClassName="ui-apr-contract-status"
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
            variant="outline"
            tone="rose"
            uniqueClassName="ui-apr-contract-reset"
            onPress={() => {
              const next = new URLSearchParams(searchParams.toString());
              next.delete('q');
              next.delete('tab');
              navigate(buildUrl(location.pathname, next), { replace: true });
            }}
          >
            {t('sidebar.resetFilter')}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-4">
        <div className="font-bold text-rose-800">{t('sidebar.category')}</div>
        <div className="mt-3 space-y-2 text-sm">
          {[
            t('sidebar.categoryOptions.overseas'),
            t('sidebar.categoryOptions.supply'),
            t('sidebar.categoryOptions.device'),
            t('sidebar.categoryOptions.marketing')
          ].map((label, index) => (
            <Button
              key={label}
              fullWidth
              variant="ghost"
              tone="rose"
              align="start"
              uniqueClassName={`ui-apr-category-${index}`}
              onPress={() => alert(`APR 카테고리: ${label}`)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}