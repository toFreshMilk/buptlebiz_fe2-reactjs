import React, { useState } from 'react';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { AuthContext, User, useAuth } from './AuthContext';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem(TOKEN_KEY);
  });
  
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(USER_KEY);
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (token: string, user: User) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}

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