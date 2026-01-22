// src/containers/Tenant/TenantLayout.tsx
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

const TenantLayout = () => {
    // AppConfigContext가 이미 tenantId 감지 및 config 로딩을 완료했거나 진행 중임.
    // 여기서 직접 loadTenantConfig를 호출하거나 set할 필요가 없음.
    const { config, isLoading, error } = useAppConfig();

    // [Theme 적용] config가 로드되면 테마 색상 적용
    useEffect(() => {
        if (config?.theme?.primaryColor) {
            document.documentElement.style.setProperty('--color-primary', config.theme.primaryColor);
        }
    }, [config]);

    // 1. 에러 처리 (AppConfigContext에서 throw 하지 않았을 경우 대비)
    if (error) {
        console.error("Failed to load tenant config:", error);
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-red-600">Configuration Error</h1>
                    <p className="mt-2 text-gray-600">{error.message}</p>
                    <p className="mt-1 text-sm text-gray-400">Please check your URL or contact support.</p>
                </div>
            </div>
        );
    }

    // 2. 로딩 처리
    if (isLoading || !config) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-pulse text-lg font-medium text-gray-500">
                    Loading Workspace...
                </div>
            </div>
        );
    }

    // 3. 정상 렌더링
    return <Outlet />;
};

export default TenantLayout;
