// src/routes.tsx
import { RouteObject, Navigate } from 'react-router-dom';

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

// Pages - Public (예시)
// import LoginPage from '@/app/(public)/login/LoginPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      // [Group 1] Public (로그인, 외부 페이지)
      // URL: /login, /external/...
      {
        element: <PublicLayout />,
        children: [
          // { path: 'login', element: <LoginPage /> },
          // { path: 'external/*', element: <ExternalSignPage /> },
        ],
      },

      // [Group 2] Internal (업무 공간)
      // URL: /contract (앞에 tenantId 없음)
      // Pathless Layout 사용: path 속성 없이 element만 지정하여 레이아웃만 적용
      {
        element: <InternalLayout />,
        errorElement: <InternalError />,
        children: [
          // 루트('/') 접근 시 contract로 리다이렉트
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
          // { path: 'advice', element: <AdvicePage /> },
          // { path: 'admin', element: <AdminPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
