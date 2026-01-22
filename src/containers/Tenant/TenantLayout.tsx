import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { loadTenantConfig } from '@/core/config/tenant.config';
import { getTenantFromSubdomain } from '@/core/utils/auth.guard'; // [추가]

const TenantLayout = () => {
    const navigate = useNavigate();
    const { setTenantConfig } = useAppConfig();

    // [변경] URL 파라미터가 아닌 서브도메인에서 추출
    const tenantId = getTenantFromSubdomain();

    useEffect(() => {
        // 1. 테넌트가 없거나 유효하지 않으면 404 처리 혹은 랜딩 페이지로 이동
        if (!tenantId) {
            console.error("Invalid Tenant Subdomain");
            // navigate('/not-found', { replace: true }); // 또는 회사 소개 페이지로 리다이렉트
            return;
        }

        // 2. Tenant Config 로드
        loadTenantConfig(tenantId)
            .then((config) => {
                setTenantConfig(tenantId, config);
                // Theme 적용
                if (config.theme?.primaryColor) {
                    document.documentElement.style.setProperty('--primary-color', config.theme.primaryColor);
                }
            })
            .catch((err) => {
                console.error("Failed to load config", err);
            });

    }, [tenantId, navigate, setTenantConfig]);

    if (!tenantId) {
        // 서브도메인이 없을 때 보여줄 화면 (예: "존재하지 않는 기업입니다")
        return <div className="p-10 text-center">Invalid Workspace</div>;
    }

    return <Outlet />;
};

export default TenantLayout;
