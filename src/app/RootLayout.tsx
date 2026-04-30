// src/app/RootLayout.tsx
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useI18nSync } from '@/core/hooks/useI18nSync';

const RootLayout = () => {
  const { lang } = useParams<{ lang: string }>();
  const { isInvalidLang, defaultLang } = useI18nSync(lang);

  if (isInvalidLang) {
    return <Navigate to={`/${defaultLang}`} replace />;
  }

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default RootLayout;
