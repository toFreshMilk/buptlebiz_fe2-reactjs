import { apiPost } from '@/core/service/apiClient';

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
  };
}

export class AuthService {
  static async login(tenantId: string, email: string, password: string): Promise<LoginResponse> {
    console.log(`[AuthService] 로그인 시도 - 이메일: ${email}`);
    const res = await apiPost<LoginResponse>('/auth/login', tenantId, { email, password });
    
    // 비즈니스 로직(서비스)에서 데이터 저장 책임을 가집니다.
    if (res.success && res.token) {
      localStorage.setItem('auth_token', res.token);
      localStorage.setItem('auth_user', JSON.stringify({ ...res.user, tenantId }));
    }
    
    return res;
  }

  static async logout(tenantId: string): Promise<{ success: boolean }> {
    console.log(`[AuthService] 로그아웃 시도`);
    const res = await apiPost<{ success: boolean }>('/auth/logout', tenantId, {});
    
    if (res.success) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
    
    return res;
  }
}

export default AuthService;