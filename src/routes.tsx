import { RouteObject, Navigate } from 'react-router-dom';

// Layouts
import RootLayout from '@/containers/RootLayout';
import NotFound from '@/containers/NotFound';
import TenantLayout from '@/containers/Tenant/TenantLayout';
import TenantError from '@/containers/Tenant/TenantError';
import MainLayout from '@/containers/Tenant/Main/MainLayout';

// Pages
import ContractPage from '@/containers/Tenant/Main/Contract/ContractPage';
import ContractDetailPage from '@/containers/Tenant/Main/Contract/ContractDetailPage';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                // [변경] :tenantId 경로 제거 -> 바로 TenantLayout 연결
                element: <TenantLayout />,
                errorElement: <TenantError />,
                children: [
                    {
                        path: '',
                        element: <MainLayout />,
                        children: [
                            {
                                index: true,
                                element: <Navigate to="contract" replace />,
                            },
                            {
                                path: 'contract',
                                element: <ContractPage />,
                            },
                            {
                                path: 'contract/:id',
                                element: <ContractDetailPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
];
