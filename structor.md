# 📂 BuptleBiz FE 2.0 Directory Structure

BuptleBiz FE 2.0은 **멀티 테넌트(Multi-tenant)**와 **도메인 중심(Domain-driven)** 설계를 기반으로 디렉토리를 구성합니다.

```text
buptlebiz_fe2/
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 package.json
├── 📄 pnpm-lock.yaml
├── 📄 README.md                # 메인 프로젝트 가이드
├── 📄 structor.md              # [현재 파일] 디렉토리 구조 상세 설명
├── 📄 tailwind.config.ts       # TailwindCSS V4 설정
├── 📄 tsconfig.*.json          # TypeScript 설정 파일들
├── 📄 vite.config.ts           # Vite 번들러 설정
│
├── 📁 public/                  # 정적 에셋 (이미지, 파비콘) 및 Mock 데이터
│
└── 📁 src/                     # React 소스 코드 루트
    ├── 📄 main.tsx             # React 앱 엔트리 포인트
    ├── 📄 App.tsx              # 최상위 App 컴포넌트 (Provider 세팅)
    ├── 📄 routes.tsx           # React Router 기반 라우팅 (SSOT 기반 다국어 라우팅, 직접 UI 조립 없이 테넌트 슬롯만 연결)
    │
    ├── 📁 core/                # ⚙️ 프론트엔드 코어 비즈니스 로직 및 공통 설정
    │   ├── 📁 config/          # 테넌트(고객사)별 기능 토글 및 의존성 주입 설정
    │   │   ├── 📄 tenant.config.ts   # 테넌트 로더 매니저
    │   │   ├── 📄 tenant.types.ts    # 테넌트 설정 타입
    │   │   └── 📁 tenants/           # 각 고객사별 실제 설정 파일 (apr, demo 등)
    │   ├── 📁 contexts/        # React 전역 상태 (Context API)
    │   │   └── 📄 AppConfigContext.ts  # 테넌트 설정을 전역에 공급
    │   ├── 📁 hooks/           # 도메인에 종속되지 않은 Core Custom Hooks
    │   │   ├── 📄 useCoreTranslation.ts # i18n 번역 훅 (common Fallback 및 테넌트 오버라이드 지원)
    │   │   ├── 📄 useI18nSync.ts        # URL 파라미터 기반 다국어 동기화
    │   │   ├── 📄 useTenant.ts          # 서브도메인에서 테넌트 ID 추출
    │   │   └── 📄 useTenantModule.ts    # 고객사별 커스텀 컴포넌트 동적 로딩 (Lazy Load)
    │   ├── 📁 service/         # 서드파티 라이브러리 초기화 및 코어 서비스
    │   │   ├── 📄 apiClient.ts   # Axios 인스턴스
    │   │   ├── 📄 i18n.ts        # i18next 설정 (한국어 조사 처리 및 리소스 병합)
    │   │   └── 📄 queryClient.ts # React Query 설정
    │   ├── 📁 uikit/           # 🧩 도메인에 종속되지 않은 순수 공통 디자인 시스템 (UI Component)
    │   │   ├── 📁 calendar/    # DatePicker 등
    │   │   ├── 📁 card/        # StatCard 등
    │   │   ├── 📁 chart/       # Recharts 래퍼 (BarChart 등)
    │   │   ├── 📁 editor/      # 에디터 래퍼 (OnlyofficeEditor 등)
    │   │   ├── 📁 feedback/    # 시스템 상호작용 피드백 (LoadingBar, Modal 등)
    │   │   ├── 📁 form/        # Button, Input, Select 등 폼 요소
    │   │   ├── 📁 layout/      # PageContainer, Section 등 레이아웃 구성 요소
    │   │   └── 📁 table/       # TanStack Table 래퍼 (DataTable 등)
    │   └── 📁 utils/           # 유틸리티 함수 모음
    │
    ├── 📁 standard/            # 🏛️ [표준] 기본 제공 컴포넌트, 로직 및 언어팩 (모든 테넌트 공유 뼈대)
    │   ├── 📄 registry.ts      # 표준 컴포넌트/서비스/i18n 인덱싱 및 테넌트 오버라이드 등록 (SSOT)
    │   ├── 📄 standard.css     # 표준 글로벌 스타일
    │   ├── 📁 layouts/         # 🌐 공통 라우팅 레이아웃 (이전 app/ 레이어 대체)
    │   │   ├── 📁 RootLayout/  # 최상위 레이아웃 및 에러 바운더리
    │   │   ├── 📁 InternalLayout/ # 로그인 후 접근하는 내부 업무 영역
    │   │   └── 📁 PublicLayout/ # 인증 없이 접근 가능한 외부 영역
    │   ├── 📁 modules/         # 도메인별 표준 모듈
    │   │   └── 📁 contract/    # 계약(Contract) 도메인 관련 표준 구현체
    │   │       ├── 📁 components/  # (ContractPage, ContractDetailPage 등)
    │   │       ├── 📁 locales/     # 계약 도메인 다국어 파일
    │   │       └── 📁 services/    # 계약 관련 API 통신 서비스
    │   └── 📁 shared/          # 도메인을 가리지 않고 사용하는 공통 UI 및 요소
    │       ├── 📁 components/  # (TopNavbar, LanguageSwitcher, WorkspaceBanner 등)
    │       └── 📁 locales/     # 공통 다국어 파일 (common.json)
    │
    └── 📁 custom/              # 🎨 [커스텀] 고객사별 컴포넌트, 스타일 및 다국어 오버라이드 폴더
        ├── 📁 apr/             # APR 전용 커스텀 코드
        │   ├── 📄 apr.css      # APR 전용 글로벌 스타일
        │   ├── 📁 modules/     # APR 전용 도메인 오버라이드
        │   │   └── 📁 contract/ 
        │   │       ├── 📁 components/ # (APR 전용 ContractPage 등)
        │   │       ├── 📁 locales/    # APR 전용 번역 문구
        │   │       └── 📁 services/
        │   └── 📁 shared/      # APR 전용 공통 요소
        │       ├── 📁 components/ # APR 전용 WorkspaceBanner 등
        │       └── 📁 locales/    # APR 전용 공통 번역 (common.json)
        └── 📁 demo/            # 데모 환경 전용 커스텀 코드
            ├── 📄 demo.css
            ├── 📁 modules/
            └── 📁 shared/
```
