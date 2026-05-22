https://apr.buptlebiz-fe2.pages.dev/ko/contract,

https://demo.buptlebiz-fe2.pages.dev/ko/contract

* 에러로그 및 에러 페이지 시스템 점검할것(로그인 붙인 후)

# 📝 리액트 19 어플리케이션

기업용 계약 및 법무 관리 솔루션을 제공하는 B2B SaaS 프론트엔드 애플리케이션입니다.

## 🎯 핵심 비즈니스 요구사항 및 설계 철학

본 프로젝트는 50여 개 이상의 B2B 고객사를 단일 코드베이스로 효율적으로 대응하기 위해 다음과 같은 핵심 철학을 바탕으로 설계되었습니다.

1. **대규모 멀티 테넌트 대응 (50여 개 B2B 고객사)**
   - `src/standard/`와 `src/custom/` 폴더를 엄격하게 분리하여 모든 고객사가 공유하는 핵심 비즈니스 로직을 보호합니다.
   - 개별 고객사의 고유한 요구사항은 `src/custom/` 내에서 오버라이드하며, `registry.ts`를 활용하여 각 고객사 환경에 맞는 페이지와 레이아웃을 동적으로 조립(Composition)합니다.

2. **독립적 슬롯 조립 아키텍처 (No-App & Props 전달 지양)**
   - 각 기능 모듈의 진입점(`index.tsx`)이 순수 조립자(Assembler) 역할만 수행하도록 강제합니다.
   - 부모 컴포넌트에서 자식 컴포넌트로 Props를 내려주는 것을 엄격히 금지합니다. 각 슬롯 컴포넌트는 URL 파라미터를 읽어 자율적으로 데이터를 페칭하고 상태를 관리하여 결합도를 끊어냅니다.

3. **단일 진실 공급원으로서의 URL (URL as SSOT)**
   - 검색 필터, 다국어 설정, 탭 상태 등 결과를 조회하는 주요 UI 상태는 전역 상태 라이브러리(Redux/Zustand 등)를 사용하지 않고, `nuqs`를 통해 URL 쿼리 파라미터에 기록합니다.
   - 컴포넌트 간의 상태 동기화는 URL을 매개로만 이루어집니다.

4. **Fail-Fast 및 방어적 기본값 지양 (No Defensive Defaulting)**
   - 시스템 동작에 필수적인 설정값(예: TenantConfig) 누락 시, 임의의 기본값(Fallback)으로 덮어씌워 조용히 넘어가지 않습니다.
   - 잘못된 설정은 즉시 런타임 에러를 발생시켜(Fail-fast) Error Boundary가 캐치하도록 하여 문제를 조기에 명시적으로 드러냅니다.

## 🚀 Tech Stack

- **Framework**: React 19 (React Compiler 적용)
- **Build Tool**: Vite 8
- **Language**: TypeScript 5.4
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **State Management**:
  - Server State: `@tanstack/react-query`
  - URL State: `nuqs` (URL을 단일 진실의 원천으로 활용)
- **i18n**: `i18next`, `react-i18next`, `i18next-korean-postposition-processor` (조사 자동 처리)
- **UI Components**: `@tanstack/react-table`, `recharts`, `lucide-react`
- **Testing**: Playwright (E2E)

---

## 🏗️ Architecture Highlights

### 1. Multi-tenant System (멀티 테넌트)

서브도메인(예: `apr.buptlebiz.com`, `demo.buptlebiz.com`)을 기반으로 고객사를 식별하고, 각 고객사에 맞는 설정과 UI 컴포넌트를 동적으로 주입합니다.

- **`src/standard/`**: 모든 고객사가 공통으로 사용하는 표준 비즈니스 로직과 UI 컴포넌트 (`Base`)
- **`src/custom/{tenantId}/`**: 특정 고객사(예: `apr`, `demo`)만을 위한 커스텀 로직과 UI 오버라이드
- **Tenant Config (`src/core/config/`)**: 고객사별 활성화 기능(Feature Flag), 다국어 지원 범위, 커스텀 컴포넌트 맵핑 관리

### 2. URL-driven i18n (라우팅 기반 다국어)

상태 유실 방지와 SEO 최적화를 위해 **"URL이 진실의 원천(SSOT)"**이 되는 다국어 시스템을 채택했습니다.

- 예: `/{lang}/contract` (`/ko/contract`, `/en/contract`)
- 언어 변경 시 i18n 상태를 직접 변이시키지 않고, URL을 이동(Navigate)시켜 `useI18nSync` 훅이 자동으로 동기화하도록 처리됩니다.
- **한국어 조사 처리**: 번역 파일에 `"'{{title}}'[[를]]"` 형태로 작성하면, 문맥(받침 유무 및 따옴표)을 파악하여 '을/를', '이/가' 등을 자동으로 교정합니다.

### 3. URL State Management (`nuqs`)

컴포넌트 간의 결합도를 낮추고 독립성을 유지하기 위해, 검색 필터, 활성 탭 등의 조회 조건 상태는 React State가 아닌 URL Query Parameter로 관리합니다.

---

## 📂 Directory Structure

프로젝트의 전체 디렉토리 트리 및 각 폴더별 상세 역할 설명은 별도의 문서로 관리하고 있습니다.

👉 **[디렉토리 구조 상세 설명 보기 (structor.md)](./structor.md)**

---

## 💻 Scripts

```bash
# 개발 서버 실행
pnpm run dev

# 타입 검사 및 프로덕션 빌드
pnpm run build

# 코드 린트 검사
pnpm run lint

```

---

## 📋 Development Convention (Code Quality)

1. **억지 타입 캐스팅(`as`) 금지**: 타입 가드나 좁히기를 통해 명확한 타입 설계를 지향합니다.
2. **컴포넌트 독립성 원칙**: 페이지 UI를 구성하는 컴포넌트들은 다른 컴포넌트의 상태에 강하게 의존하지 않고, URL 쿼리 파라미터(`nuqs`)를 매개로만 동기화되어야 테넌트별 컴포넌트 교체 시 사이드 이펙트가 발생하지 않습니다.
3. **명시적인 i18n Fallback**: 도메인 번역을 가져올 때 `const { t } = useCoreTranslation('contract')`를 사용하더라도, `common` 네임스페이스가 자동으로 묶이도록 설계되어 공통 문구는 prefix 없이 바로 사용 가능합니다.
