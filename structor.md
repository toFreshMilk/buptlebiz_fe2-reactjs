# 📂 BuptleBiz FE 2.0 Directory Structure

BuptleBiz FE 2.0은 **멀티 테넌트(Multi-tenant)**와 **도메인 중심(Domain-driven)** 설계를 기반으로 디렉토리를 구성합니다. 방어적 기본값 지양, 아토믹 플래트닝(Atomic Flattening) 및 Props 없는 슬롯 조립(Autonomous Component) 패턴을 엄격하게 준수합니다.

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
    ├── 📄 App.tsx              # 최상위 App 컴포넌트 (Provider 세팅 및 i18n 최상위 로딩 바운더리)
    ├── 📄 routes.tsx           # React Router 기반 라우팅 (직접 UI 조립 없이 테넌트 슬롯만 연결)
    │
    ├── 📁 core/                # ⚙️ 프론트엔드 코어 비즈니스 로직 및 공통 설정
    │   ├── 📁 config/          # 테넌트(고객사)별 기능 토글 및 의존성 주입 설정
    │   ├── 📁 contexts/        # React 전역 상태 (AppConfigProvider 등 Fail-Fast 구조)
    │   ├── 📁 hooks/           # 도메인에 종속되지 않은 Core Custom Hooks (useI18nSync 등)
    │   ├── 📁 service/         # 서드파티 라이브러리 초기화 및 코어 서비스 (apiClient, queryClient)
    │   ├── 📁 uikit/           # 🧩 도메인에 종속되지 않은 순수 공통 디자인 시스템 (Dumb Components)
    │   │   └── 📁 layout/
    │   │       └── 📄 Slot.tsx # 자율 페칭 및 독립 로딩을 관장하는 핵심 슬롯 컴포넌트
    │   └── 📁 utils/           # 유틸리티 함수 모음
    │
    ├── 📁 standard/            # 🏛️ [표준] 모든 테넌트가 공유하는 기본 뼈대
    │   ├── 📄 registry.ts      # 표준 컴포넌트/서비스/i18n 인덱싱 (SSOT)
    │   ├── 📄 standard.css     # 표준 글로벌 스타일
    │   ├── 📁 layouts/         # 🌐 공통 라우팅 레이아웃 오케스트레이터
    │   │   └── 📁 RootLayout/  
    │   │       ├── 📁 InternalLayout/ # 내부 업무 영역 (TopNavbar, Banner, GlobalFooter 슬롯 조립)
    │   │       └── 📁 PublicLayout/ # 로그인, 외부 제공 페이지
    │   ├── 📁 modules/         # 도메인별 표준 모듈
    │   │   └── 📁 contract/    # 계약(Contract) 도메인
    │   │       ├── 📁 components/  # Atomic Flattening 적용된 1-depth 폴더 구조
    │   │       │   ├── 📁 ContractDetailPage/ # index.tsx(조립기) + Left, Right, Top 슬롯
    │   │       │   └── 📁 ContractPage/       # index.tsx(조립기) + Header, List, Sidebar, Tabs 슬롯
    │   │       ├── 📁 locales/
    │   │       └── 📁 services/
    │   └── 📁 shared/          # 도메인 무관 공통 UI 슬롯 (GlobalFooter, TopNavbar 등)
    │       ├── 📁 components/
    │       └── 📁 locales/
    │
    └── 📁 custom/              # 🎨 [커스텀] 고객사별 오버라이드 폴더 (Sparse Override)
        ├── 📁 apr/             # APR 전용 커스텀 코드
        │   ├── 📄 apr.css
        │   ├── 📁 modules/
        │   │   └── 📁 contract/
        │   │       └── 📁 components/
        │   │           └── 📁 ContractPage/ # APR 전용 대시보드 구조 (Header, Board, Sidebar 분리)
        │   └── 📁 shared/
        └── 📁 demo/            # 데모 환경 전용 커스텀 코드
```
