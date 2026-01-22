import { createContext, useContext, ReactNode, useState } from 'react';
import type { TenantConfig } from '@/core/config/tenant.types'; // [수정] 타입 파일에서 인터페이스 import

interface AppConfigContextValue {
    tenantId: string | null;
    config: TenantConfig | null; // [수정] 함수가 아니라 데이터 객체 타입 사용
    setTenantConfig: (tenantId: string, config: TenantConfig) => void;
}

const AppConfigContext = createContext<AppConfigContextValue | undefined>(undefined);

export const AppConfigProvider = ({ children }: { children: ReactNode }) => {
    const [tenantId, setTenantId] = useState<string | null>(null);
    const [config, setConfig] = useState<TenantConfig | null>(null);

    const setTenantConfig = (id: string, newConfig: TenantConfig) => {
        setTenantId(id);
        setConfig(newConfig);
    };

    return (
        <AppConfigContext.Provider value={{ tenantId, config, setTenantConfig }}>
            {children}
        </AppConfigContext.Provider>
    );
};

export const useAppConfig = () => {
    const context = useContext(AppConfigContext);
    if (!context) {
        throw new Error('useAppConfig must be used within an AppConfigProvider');
    }
    return context;
};
