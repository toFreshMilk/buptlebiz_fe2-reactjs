import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext.ts';
import { Slot } from '@/core/uikit/layout/Slot';

const InternalLayout = () => {
  const { config } = useAppConfig();

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', config.theme.primaryColor);
  }, [config]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="shrink-0">
        <Slot name="TopNavbar" />
        <Slot name="WorkspaceBanner" />
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Slot name="GlobalFooter" />
    </div>
  );
};

export default InternalLayout;

//레이아웃 레벨에서 헤더와 푸터를 규격화 할것.
