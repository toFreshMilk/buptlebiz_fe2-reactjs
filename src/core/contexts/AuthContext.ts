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
    throw new Error('useAuth must be used within <AuthProvider />');
  }

  return context;
}