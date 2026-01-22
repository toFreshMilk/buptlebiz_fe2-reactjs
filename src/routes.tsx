import { RouteObject, Navigate } from 'react-router-dom';

// Layout Containers
import RootLayout from '@/containers/RootLayout';
import NotFound from '@/containers/NotFound';
import TenantLayout from '@/containers/Tenant/TenantLayout';
import TenantError from '@/containers/Tenant/TenantError';
import MainLayout from '@/containers/Tenant/Main/MainLayout';

// Page Containers
import ContractPage from '@/containers/Tenant/Main/Contract/ContractPage';
import ContractDetailPage from '@/containers/Tenant/Main/Contract/ContractDetailPage';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />, // Global Error
        children: [
            {
                index: true,
                element: <Navigate to="/demo/contract" replace />, // 기본 리다이렉트
            },
            {
                // Tenant Route: /:tenantId
                path: ':tenantId',
                element: <TenantLayout />,
                errorElement: <TenantError />, // Tenant Level Error Boundary
                children: [
                    {
                        // Main Layout (Navbar + Banner)
                        path: '',
                        element: <MainLayout />,
                        children: [
                            {
                                index: true,
                                element: <Navigate to="contract" replace />,
                            },
                            {
                                // Contract List Page
                                path: 'contract',
                                element: <ContractPage />,
                            },
                            {
                                // Contract Detail Page
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
