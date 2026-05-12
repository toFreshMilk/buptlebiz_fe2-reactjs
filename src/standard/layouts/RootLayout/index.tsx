import { useParams, Outlet } from 'react-router-dom';
import { useI18nSync } from '@/core/hooks/useI18nSync';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

const RootLayout = () => {
  const { lang } = useParams<{ lang: string }>();
  useI18nSync(lang);

  return (
    <NuqsAdapter>
      <div className="min-h-screen">
        <Outlet />
      </div>
    </NuqsAdapter>
  );
};

export default RootLayout;
