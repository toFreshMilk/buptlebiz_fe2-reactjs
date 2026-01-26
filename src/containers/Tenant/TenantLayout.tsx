// src/containers/Tenant/TenantLayout.tsx
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppConfigProvider } from '@/core/contexts/AppConfigProvider';
import { useAppConfig } from '@/core/contexts/AppConfigContext.ts';

// [내부 컴포넌트] Context 사용 (useAppConfig 호출 가능)
const TenantLayoutContent = () => {
  const { config } = useAppConfig();

  // Theme 적용
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', config.theme.primaryColor);
  }, [config]);

  // 정상 렌더링
  return <Outlet />;
};

// [외부 컴포넌트] Provider 제공 (라우터에 연결되는 메인 컴포넌트)
const TenantLayout = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-pulse text-lg font-medium text-gray-500">Loading Workspace...</div>
        </div>
      }
    >
      <AppConfigProvider>
        <TenantLayoutContent />
      </AppConfigProvider>
    </Suspense>
  );
};

export default TenantLayout;
