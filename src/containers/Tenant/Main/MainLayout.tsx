// src/containers/Tenant/Main/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavbar from '@/standard/shared/components/TopNavbar';
import { useTenantComponent } from '@/core/hooks/useTenantModule';

const MainLayout = () => {
  const { Component: WorkspaceBanner } = useTenantComponent('WorkspaceBanner');

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      {/*여기서 말고 디테일하게 선별해서 적용*/}
      <WorkspaceBanner />
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
