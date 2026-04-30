// src/app/RootLayout.tsx
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useI18nSync } from '@/core/hooks/useI18nSync';
import { NuqsAdapter } from 'nuqs/adapters/react-router';

const RootLayout = () => {
  const { lang } = useParams<{ lang: string }>();
  const { isInvalidLang, defaultLang } = useI18nSync(lang);

  if (isInvalidLang) {
    return <Navigate to={`/${defaultLang}`} replace />;
  }

  return (
    <NuqsAdapter>
      <div className="min-h-screen">
        <Outlet />
      </div>
    </NuqsAdapter>
  );
};

export default RootLayout;
