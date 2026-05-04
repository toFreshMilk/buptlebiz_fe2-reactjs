// src/core/config/tenants/demo.config.ts
import { TenantConfig } from '../tenant.types';
import '@/custom/demo/demo.css'; // [추가]

const config: TenantConfig = {
  id: 'demo',
  name: 'Buptle Demo',
  features: { i18n: ['ko', 'en'], defaultLang: 'ko', ai: true, sso: true },
  theme: { primaryColor: '#8b5cf6' },

  // Demo는 Standard를 유지하고, 눈에 띄는 "부분 UI"만 교체하여 데모임을 표시
  components: {
    WorkspaceBanner: () => import('@/custom/demo/shared/components/WorkspaceBanner'),
    ContractDetailLeft: () => import('@/custom/demo/contract/components/ContractDetailLeft'),
  },
};
export default config;
