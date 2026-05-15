import React from 'react';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '@/core/contexts/AuthContext';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();

  if (!isAuthenticated) {
    // 로그인 안 한 경우, 원래 가려던 URL을 파라미터로 넘길 수도 있지만, 현재는 단순 리다이렉트
    return <Navigate to={`/${lang}/login`} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}