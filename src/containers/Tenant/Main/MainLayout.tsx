// src/containers/Tenant/Main/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavbar from '@/standard/shared/components/TopNavbar'; // TopNavbar는 공통이라 정적 import도 무방하지만 일관성을 위해 동적 로드 가능
import { useTenantComponent } from '@/core/hooks/useTenantModule';

const MainLayout = () => {
  // WorkspaceBanner 동적 로드
  // 없으면 null(fallback) 처리가 필요하거나 config에서 기본값 지정
  const { Component: WorkspaceBanner } = useTenantComponent('WorkspaceBanner');

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      {/*여기서 말고 디테일하게 선별해서 적용*/}
      <React.Suspense fallback={<div className="h-12 bg-gray-100 animate-pulse">ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ </div>}>
        <WorkspaceBanner />
      </React.Suspense>
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
