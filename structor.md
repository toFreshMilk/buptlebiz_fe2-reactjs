buptlebiz_fe/
│
├── package.json # Dependencies / Scripts (React 19, Vite)
├── pnpm-lock.yaml # pnpm lockfile
├── pnpm-workspace.yaml # pnpm workspace
├── vite.config.ts # [변경] Vite Configuration (Proxy, Alias 설정)
├── vite-env.d.ts # [변경] Vite Client Types
├── tsconfig.json # TypeScript config
├── tsconfig.node.json # [추가] Vite Node Build config
├── tailwind.config.ts # Tailwind config (v4에서는 CSS @theme 사용 권장이나 호환 유지)
├── eslint.config.mjs # ESLint config
├── index.html # [추가] Client Entry Point (Vite 필수)
├── README.md # Project docs
├── structor.md # Project structure doc
│
├── public/ # Static assets (그대로 유지)
│   └── ... (기존 에셋 구조 동일)
│
└── src/
├── main.tsx # [추가] React Root Entry (DOM 렌더링)
├── App.tsx # [추가] Global Provider 세팅 (QueryClient, Theme 등)
├── routes.tsx # [변경] React Router 정의 (Next.js File-system Routing 대체)
│
├── core/
│   ├── config/
│   │   ├── tenant.config.ts # 테넌트 설정 로더 + 서비스/컴포넌트 매핑
│   │   │   # [제거] tenant.types.ts (Colocation 원칙에 따라 각 모듈로 이동)
│   │   └── tenants/
│   │       ├── apr.config.ts # APR Tenant Config
│   │       └── demo.config.ts # Demo Tenant Config
│   │
│   ├── contexts/
│   │   └── AppConfigContext.tsx # App Config Context
│   │
│   ├── hooks/
│   │   └── useTenant.ts # Tenant 식별 Hook (useParams or window.location 기반)
│   │
│   ├── services/
│   │   ├── apiClient.ts # API Client (Axios/Fetch Instance)
│   │   └── queryClient.ts # [변경] React Query Client 설정 (Server Action 대체)
│   │
│   └── utils/
│       ├── auth.guard.ts # [변경] 클라이언트 사이드 라우트 가드 (proxy.ts 대체)
│       ├── date.util.ts # Date utilities
│       ├── object.util.ts # Object utilities
│       └── string.util.ts # String utilities
│
├── containers/ # [변경] app/ 폴더 대체. "Container Pattern"의 핵심 구현체
│   ├── RootLayout.tsx # Root Layout (Outlet 포함)
│   ├── NotFound.tsx # Global 404
│   │
│   └── Tenant/ # Tenant별 컨테이너 로직
│       ├── TenantLayout.tsx # Tenant Config 주입 및 Guard 처리
│       ├── TenantError.tsx # Error Boundary 컴포넌트
│       │
│       └── Main/
│           ├── MainLayout.tsx # Main Layout (TopNavbar, WorkspaceBanner 조립)
│           └── Contract/
│               ├── ContractPage.tsx # [Container] Contract List 데이터 fetching 및 조립
│               └── ContractDetailPage.tsx # [Container] Contract Detail 데이터 fetching 및 조립
│
├── standard/ # [Base] 기본 구현체 (Colocation: 타입 포함)
│   ├── standard.css # Standard Styles
│   │
│   ├── shared/
│   │   └── components/
│   │       ├── TopNavbar.tsx # Standard TopNavbar
│   │       └── WorkspaceBanner.tsx # Standard WorkspaceBanner
│   │
│   └── contract/ # 도메인 모듈
│       ├── types.ts # [이동] Contract 관련 타입 정의 (Ownership: 모듈 소유)
│       ├── components/
│       │   ├── ContractSidebar.tsx # Standard Contract Sidebar
│       │   ├── ContractMain.tsx # Standard Contract Main
│       │   ├── ContractList.tsx # Standard Contract List
│       │   ├── ContractDetailTop.tsx # Standard Contract Detail Top
│       │   ├── ContractDetailLeft.tsx # Standard Contract Detail Left
│       │   └── ContractDetailRight.tsx # Standard Contract Detail Right
│       └── services/
│           └── contract.service.ts # Standard API Calls (fetching 로직)
│
├── tenants/ # [Override] 테넌트별 오버라이드
│   ├── apr/
│   │   ├── apr.css # APR Tenant Styles
│   │   ├── contract/
│   │   │   ├── components/
│   │   │   │   ├── ContractSidebar.tsx # APR Contract Sidebar Override
│   │   │   │   └── ContractMain.tsx # APR Contract Main Override
│   │   │   └── services/
│   │   │       └── contract.service.ts # APR Contract API Override
│   │   └── shared/
│   │       └── components/
│   │           └── WorkspaceBanner.tsx # APR WorkspaceBanner Override
│   │
│   └── demo/
│       ├── demo.css # Demo Tenant Styles
│       ├── contract/
│       │   └── services/
│       │       └── contract.service.ts # Demo Contract Service Override
│       └── shared/
│           └── components/
│               └── WorkspaceBanner.tsx # Demo WorkspaceBanner Override
│
└── uikit/ # UI Kit Components (재사용 공통 컴포넌트)
├── card/
│   └── StatCard.tsx # 통계 카드 컴포넌트
├── chart/
│   └── BarChart.tsx # 막대 차트 컴포넌트
├── form/
│   ├── Button.tsx # 버튼 컴포넌트
│   ├── Input.tsx # 입력 필드 컴포넌트
│   └── Select.tsx # 셀렉트 컴포넌트
└── layout/
├── PageContainer.tsx # 페이지 컨테이너
└── Section.tsx # 섹션 컴포넌트
