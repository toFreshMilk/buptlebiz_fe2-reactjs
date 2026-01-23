// src/containers/Tenant/TenantLayout.tsx
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppConfigProvider } from '@/core/contexts/AppConfigProvider';
import { useAppConfig } from '@/core/hooks/useAppConfig';

// [내부 컴포넌트] Context 사용 (useAppConfig 호출 가능)
const TenantLayoutContent = () => {
  const { config, isLoading, error } = useAppConfig();

  // Theme 적용
  useEffect(() => {
    if (config?.theme?.primaryColor) {
      document.documentElement.style.setProperty('--color-primary', config.theme.primaryColor);
    }
  }, [config]);

  // 에러 처리
  if (error) {
    console.error('Failed to load tenant config:', error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-600">Configuration Error</h1>
          <p className="mt-2 text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  // 로딩 처리
  if (isLoading || !config) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg font-medium text-gray-500">Loading Workspace...</div>
      </div>
    );
  }

  // 정상 렌더링
  return <Outlet />;
};

// [외부 컴포넌트] Provider 제공 (라우터에 연결되는 메인 컴포넌트)
const TenantLayout = () => {
  return (
    <AppConfigProvider>
      <TenantLayoutContent />
    </AppConfigProvider>
  );
};

export default TenantLayout;
