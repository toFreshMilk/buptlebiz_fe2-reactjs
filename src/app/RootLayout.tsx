// src/app/RootLayout.tsx
import { useEffect } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import i18n from '@/core/i18n/i18n';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

const RootLayout = () => {
  const { lang } = useParams<{ lang: string }>();
  const { config } = useAppConfig();
  const supportedLangs = config.features.i18n;
  const defaultLang = supportedLangs[0];

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  if (lang && !supportedLangs.includes(lang)) {
    return <Navigate to={`/${defaultLang}`} replace />;
  }

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default RootLayout;
