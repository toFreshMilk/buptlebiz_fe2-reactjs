// src/routes.tsx
import { RouteObject, Navigate } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

// Layouts
import RootLayout from '@/app/RootLayout';
import NotFound from '@/app/NotFound';
import PublicLayout from '@/app/(public)/PublicLayout';
import InternalLayout from '@/app/(internal)/InternalLayout';
import InternalError from '@/app/(internal)/InternalError';

// Pages - Internal
import ContractPage from '@/app/(internal)/contract/ContractPage';
import ContractDetailPage from '@/app/(internal)/contract/ContractDetailPage';
import RootError from '@/app/RootError.tsx';

const DefaultRedirect = () => {
  const { config } = useAppConfig();
  return <Navigate to={`/${config.features.i18n[0]}/contract`} replace />;
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootError />,
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
            element: <PublicLayout />,
            children: [
              // { path: 'login', element: <LoginPage /> },
              // { path: 'external/*', element: <ExternalSignPage /> },
            ],
          },

          // [Group 2] Internal (업무 공간)
          // URL: /ko/contract, /en/contract/:id
          {
            element: <InternalLayout />,
            errorElement: <InternalError />,
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
