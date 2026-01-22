import React, { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { getTenantConfig } from '@/core/config/tenant.config';
import { isValidTenant } from '@/core/utils/auth.guard';

const TenantLayout = () => {
    const { tenantId } = useParams<{ tenantId: string }>();
    const navigate = useNavigate();
    const { setTenantConfig } = useAppConfig();

    useEffect(() => {
        // 1. Tenant 유효성 검사
        if (!isValidTenant(tenantId)) {
            navigate('/not-found', { replace: true });
            return;
        }

        // 2. Tenant Config 로드 (동기 or 비동기)
        const config = getTenantConfig(tenantId!);
        if (config) {
            setTenantConfig(tenantId!, config);

            // 3. CSS 변수 등으로 테마 주입 (선택적)
            document.documentElement.style.setProperty('--primary-color', config.theme.primaryColor);
        }
    }, [tenantId, navigate, setTenantConfig]);

    if (!isValidTenant(tenantId)) return null;

    return <Outlet />;
};

export default TenantLayout;
