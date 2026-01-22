import { Outlet } from 'react-router-dom';
import TopNavbar from '@/standard/shared/components/TopNavbar';
import WorkspaceBanner from '@/standard/shared/components/WorkspaceBanner';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

// Tenant별 오버라이드 컴포넌트 (Lazy Loading 권장하나 여기선 정적 import 예시)
// 실제로는 Config에 따라 동적 컴포넌트 매핑을 구현할 수 있습니다.
import AprWorkspaceBanner from '@/tenants/apr/shared/components/WorkspaceBanner';

const MainLayout = () => {
    const { config, tenantId } = useAppConfig();

    // Tenant별 Banner 컴포넌트 선택 로직
    const BannerComponent = tenantId === 'apr' ? AprWorkspaceBanner : WorkspaceBanner;

    const showBanner = config?.features.workspaceBanner;

    return (
        <div className="flex flex-col min-h-screen">
            <TopNavbar />
            {showBanner && <BannerComponent />}

            <main className="flex-1 bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
