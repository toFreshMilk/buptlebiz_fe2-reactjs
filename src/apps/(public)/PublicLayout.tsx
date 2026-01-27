// src/apps/(public)/PublicLayout.tsx
import { Outlet } from 'react-router-dom';

// [그룹 1] 로그인, 외부 공개 페이지용 레이아웃 (Navbar 없음, 심플함)
const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex h-16 items-center justify-center border-b border-gray-100">
        {/* 로고만 간단히 표시 */}
        <span className="text-xl font-bold text-primary">BuptleBiz</span>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
