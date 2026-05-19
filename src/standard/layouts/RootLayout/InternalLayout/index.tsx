import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext.ts';
import { useTenantComponent } from '@/core/hooks/useTenantModule';

const InternalLayout = () => {
  const { config } = useAppConfig();
  const { Component: WorkspaceBanner } = useTenantComponent('WorkspaceBanner');
  const { Component: TopNavbar } = useTenantComponent('TopNavbar');

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', config.theme.primaryColor);
  }, [config]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      <WorkspaceBanner />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default InternalLayout;
//레이아웃 레벨에서 헤더와 푸터를 규격화 할것.
