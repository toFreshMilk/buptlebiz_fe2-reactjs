buptlebiz_fe2/
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── structor.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vite-env.d.ts             # [필수 추가] Vite 타입 선언 파일
│
├── public/                   # (Mock Data 등 유지)
│
└── src/
├── main.tsx
├── App.tsx
├── routes.tsx
│
├── app/                 # (구조 좋음)
│   ├── RootLayout.tsx
│   ├── RootError.tsx
│   ├── NotFound.tsx
│   ├── (public)/
│   │   └── PublicLayout.tsx
│   └── (internal)/
│       ├── InternalLayout.tsx
│       ├── InternalError.tsx
│       └── contract/
│           ├── ContractPage.tsx
│           └── ContractDetailPage.tsx
│
├── core/
│   ├── config/
│   │   ├── tenant.config.ts
│   │   ├── tenant.types.ts
│   │   └── tenants/
│   │       ├── apr.config.ts
│   │       └── demo.config.ts
│   ├── contexts/
│   │   ├── AppConfigContext.ts
│   │   └── AppConfigProvider.tsx
│   ├── hooks/            # [수정] 순수 Hook만 남김
│   │   ├── useTenant.ts
│   │   └── useTenantModule.ts
│   ├── services/         # [위치 이동] API/Query 설정은 여기로
│   │   ├── apiClient.ts
│   │   └── queryClient.ts
│   └── utils/
│       ├── date.util.ts
│       ├── object.util.ts
│       └── string.util.ts
│
├── standard/
│   ├── standard.css
│   ├── shared/
│   │   └── components/
│   │       ├── TopNavbar.tsx
│   │       └── WorkspaceBanner.tsx
│   └── contract/
│       ├── components/
│       │   ├── ContractDetailLeft.tsx
│       │   ├── ContractDetailRight.tsx
│       │   ├── ContractDetailTop.tsx
│       │   ├── ContractList.tsx
│       │   ├── ContractMain.tsx
│       │   └── ContractSidebar.tsx
│       └── services/
│           └── contract.service.ts
│
├── custom/              
│   ├── apr/
│   │   ├── apr.css
│   │   ├── contract/
│   │   │   ├── components/
│   │   │   │   ├── ContractMain.tsx
│   │   │   │   └── ContractSidebar.tsx
│   │   │   └── services/
│   │   │       └── contract.service.ts
│   │   └── shared/
│   │       └── components/
│   │           └── WorkspaceBanner.tsx
│   └── demo/
│       ├── demo.css
│       └── shared/
│           └── components/
│               └── WorkspaceBanner.tsx
│
└── uikit/                # (구조 좋음)
├── card/
├── chart/
├── form/
└── layout/
