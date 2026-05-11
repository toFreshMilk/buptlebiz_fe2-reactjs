import { TenantConfig } from '../tenant.types';
import '@/custom/apr/apr.css'; // [추가] 이 설정파일이 로드될 때 CSS도 함께 적용됨

const config: TenantConfig = {
  id: 'apr',
  name: 'APR Corp',
  features: { i18n: ['ko', 'en'], ai: false, sso: false },
  theme: { primaryColor: '#e11d48' },

  // APR은 Standard 페이지를 유지하고, 리포트/배너 같은 일부만 교체
  components: {
    WorkspaceBanner: () => import('@/custom/apr/shared/components/WorkspaceBanner'),
    ContractSidebar: () => import('@/custom/apr/modules/contract/components/ContractPage/Sidebar'),
    // APR은 계약 메인 UI를 크게 다르게 가져감
    ContractPage: () => import('@/custom/apr/modules/contract/components/ContractPage/index'),
    ContractDetailTop: () => import('@/custom/apr/modules/contract/components/ContractDetailPage/Top'),
  },

  // APR은 계약 서비스 로직만 바꿈 (나머진 Standard 사용)
  services: {
    ContractService: () => import('@/custom/apr/modules/contract/services/contract.service'),
  },
};
export default config;
