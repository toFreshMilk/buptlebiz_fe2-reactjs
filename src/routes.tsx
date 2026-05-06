// src/routes.tsx
/* eslint-disable react-refresh/only-export-components */
import { RouteObject, Navigate } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useTenantComponent } from '@/core/hooks/useTenantModule';
import { StandardComponentKey } from '@/standard/registry';

const TenantRoute = ({ name }: { name: StandardComponentKey }) => {
  const { Component } = useTenantComponent(name);
  return <Component />;
};

const DefaultRedirect = () => {
  const { config } = useAppConfig();
  return <Navigate to={`/${config.features.defaultLang}/contract`} replace />;
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <TenantRoute name="RootLayout" />,
    errorElement: <TenantRoute name="RootError" />,
    children: [
      {
        index: true,
        element: <DefaultRedirect />,
      },

      // [언어 prefix] /:lang (ko, en)
      {
        path: ':lang',
        children: [
          // [Group 1] Public (로그인, 외부 페이지)
          // URL: /ko/login, /en/external/...
          {
            element: <TenantRoute name="PublicLayout" />,
            children: [
              // { path: 'login', element: <LoginPage /> },
              // { path: 'external/*', element: <ExternalSignPage /> },
            ],
          },

          // [Group 2] Internal (업무 공간)
          // URL: /ko/contract, /en/contract/:id
          {
            element: <TenantRoute name="InternalLayout" />,
            errorElement: <TenantRoute name="InternalError" />,
            children: [
              {
                index: true,
                element: <Navigate to="contract" replace />,
              },
              {
                path: 'contract',
                element: <TenantRoute name="ContractPage" />,
              },
              {
                path: 'contract/:id',
                element: <TenantRoute name="ContractDetailPage" />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <TenantRoute name="NotFound" />,
  },
];
