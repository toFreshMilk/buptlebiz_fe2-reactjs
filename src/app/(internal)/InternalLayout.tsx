// src/app/(internal)/InternalLayout.tsx
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppConfigProvider } from '@/core/contexts/AppConfigProvider';
import { useAppConfig } from '@/core/contexts/AppConfigContext.ts';
import { useTenantComponent } from '@/core/hooks/useTenantModule';

// [내부 컴포넌트] 설정 로드 완료 후 렌더링되는 실제 UI (구 MainLayout 역할 포함)
const InternalLayoutContent = () => {
  const { config } = useAppConfig();
  const { Component: WorkspaceBanner } = useTenantComponent('WorkspaceBanner');
  const { Component: TopNavbar } = useTenantComponent('TopNavbar');

  // Theme 적용
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', config.theme.primaryColor);
  }, [config]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      <WorkspaceBanner />
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

// [외부 컴포넌트] Provider 및 초기 로딩 처리 (구 TenantLayout 역할)
const InternalLayout = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-pulse text-lg font-medium text-gray-500">Loading Workspace...</div>
        </div>
      }
    >
      <AppConfigProvider>
        <InternalLayoutContent />
      </AppConfigProvider>
    </Suspense>
  );
};

export default InternalLayout;
