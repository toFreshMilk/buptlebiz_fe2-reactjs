// src/core/config/tenants/apr.config.ts
import { TenantConfig } from '../tenant.types';
import '@/custom/apr/apr.css'; // [추가] 이 설정파일이 로드될 때 CSS도 함께 적용됨

const config: TenantConfig = {
  id: 'apr',
  name: 'APR Corp',
  features: { i18n: false, ai: false, sso: false }, // AI 미사용
  theme: { primaryColor: '#e11d48' },

  // APR은 Standard 페이지를 유지하고, 리포트/배너 같은 일부만 교체
  components: {
    WorkspaceBanner: () => import('@/custom/apr/shared/components/WorkspaceBanner'),
    ContractSidebar: () => import('@/custom/apr/contract/components/ContractSidebar'),
    // APR은 계약 메인 UI를 크게 다르게 가져감
    ContractMain: () => import('@/custom/apr/contract/components/ContractMain'),
  },

  // APR은 계약 서비스 로직만 바꿈 (나머진 Standard 사용)
  services: {
    ContractService: () => import('@/custom/apr/contract/services/contract.service'),
  },
};
export default config;
