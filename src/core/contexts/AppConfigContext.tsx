import React, { createContext, useContext, ReactNode, useState } from 'react';
import { TenantConfig } from '../config/tenant.config'; // Config 타입은 여기만 의존

interface AppConfigContextValue {
    tenantId: string | null;
    config: TenantConfig | null;
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
