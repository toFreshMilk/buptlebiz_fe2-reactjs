import { createContext, use } from 'react';

export type User = {
  id: string;
  name: string;
  tenantId?: string;
};

export type AuthContextValue = {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('useAuth는 <AuthProvider /> 내부에서 사용되어야 합니다.');
  }

  return context;
}