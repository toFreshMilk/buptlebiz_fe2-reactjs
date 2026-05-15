import { apiGet } from '@/core/service/apiClient';

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
    // Mock 환경: 실제 POST 대신 GET으로 public 폴더의 Mock JSON을 불러옵니다.
    console.log(`[AuthService] Login attempt - Email: ${email}`);
    return await apiGet<LoginResponse>('/auth/login', tenantId);
  }

  static async logout(tenantId: string): Promise<{ success: boolean }> {
    console.log(`[AuthService] Logout attempt`);
    return await apiGet<{ success: boolean }>('/auth/logout', tenantId);
  }
}

export default AuthService;