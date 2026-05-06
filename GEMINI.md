# 프로젝트 컨벤션 가이드 (buptlebiz_fe2)

## 1. 기술 스택 및 환경 (Tech Stack)
- **Package Manager:** `pnpm` (필수). 모든 패키지 설치(`pnpm install`), 스크립트 실행(`pnpm run`), 일회성 패키지 실행(`pnpm dlx`)에는 반드시 `pnpm`을 사용하십시오. `npm` 및 `yarn` 사용은 엄격히 금지됩니다.
- **Core:** Vite + React 19 + React Router v7 (`react-router-dom`)
- **State:** TanStack Query v5 (Server State), `nuqs` (URL Query State)
- **Styling:** Tailwind CSS v4, Vanilla CSS
- **i18n:** `i18next` 기반 커스텀 훅 (`useCoreTranslation`)
- **Testing:** Playwright (`e2e/`)

## 2. TypeScript 및 코드 품질 지침
1. **억지 타입 캐스팅(`as`) 금지**: `as`를 통한 강제 타입 지정은 근본적인 해결책이 아니며 런타임 에러를 유발할 수 있습니다. 
   - 가능한 한 **타입 가드(Type Guards)**, **타입 좁히기(Type Narrowing)**, 혹은 **명확한 인터페이스 설계**를 통해 해결하십시오.
   - 외부 라이브러리 연동 등 어쩔 수 없는 경우를 제외하고 비즈니스 로직에서의 `as` 사용은 지양합니다.
2. **선언 후 미사용 코드 정리**: 선언만 되어 있고 사용되지 않는 변수, 함수, 임포트는 즉시 제거하여 코드 베이스를 청결하게 유지하십시오.
3. **선언적 코드 지향**: `| undefined`가 남발되어 코드가 지저분해지는 경우, **기본값 할당(Default Values)**, **객체 구조분해 시 초기화**, 혹은 **Nullish Coalescing(??)** 등을 활용하여 로직 내부에서의 조건부 렌더링을 최소화하십시오.

## 3. 멀티테넌트 및 조립 아키텍처 (Architecture)

### 3.1 레이어별 책임
- **`src/standard/` (Base & Composition):** 모든 테넌트가 공유하는 기본 구현체이자, 페이지의 뼈대를 조립(Composition)하는 레이어입니다. 특정 테넌트가 페이지 전체의 레이아웃(조립 방식)을 오버라이드할 수 있도록 모든 진입점(페이지, 레이아웃)은 `registry.ts`에 등록되어야 합니다.
- **`src/custom/` (Override):** 특정 테넌트(예: `apr`, `demo`)를 위한 오버라이드 코드입니다.
- **`src/core/config/` (SSOT):** 어떤 컴포넌트/서비스를 사용할지 결정하는 단일 진실 공급원입니다. (참고: 라우팅을 담당하는 `src/routes.tsx`는 순수 인프라로서 기능하며, 직접적인 UI 조립 없이 테넌트 슬롯 컴포넌트만 연결합니다.)

### 3.2 오버라이드 원칙
- **Standard 코드 오염 금지:** `standard/` 파일 내부에 `if (tenant === 'apr')`와 같은 분기 처리를 절대 하지 마십시오.
- **파일 단위 오버라이드 (Sparse Override):** 차별화가 필요하면 `src/custom/[tenant_id]/`에 파일을 만들고 `src/core/config/tenants/`에서 매핑을 업데이트하십시오. 당장 오버라이드하지 않는 도메인(예: `layouts`, `contract`)이나 빈 폴더를 무의미하게 미리 생성해두지 않고, 필요해진 순간에만 생성하여 저장소를 깔끔하게 유지합니다.

## 4. 데이터 페칭 및 상태 관리

### 4.1 Server State (React Query)
- 데이터 페칭 및 Mutation(POST/PUT/DELETE)은 TanStack Query를 사용합니다.
- **Server Actions 사용 금지:** 이 프로젝트는 표준 API 호출과 React Query를 사용하여 상태를 관리합니다.

### 4.2 URL Query State (nuqs)
- **컴포넌트 독립성 및 범위 제한 원칙**: 검색 필터, 탭 이동 등 **결과물 조회 조건을 정의하는 상태**는 URL 쿼리 파라미터에 기록합니다.
- **Single Source of Truth**: 컴포넌트 간의 상태 동기화는 Props Drilling이나 전역 상태 라이브러리 대신 URL을 매개로 수행합니다.
- 단, 단순 입력 폼이나 상세 페이지의 편집 상태 등 모든 UI 상태를 URL에 담는 것은 지양합니다.

## 5. UI 킷 스타일링 규칙 (`src/core/uikit/`)
- **Internal Style:** 컴포넌트 내부에 `variant`, `tone`, `size` 등을 정의합니다.
- **External Injection:** 외부에서 스타일 주입 시 `uniqueClassName` prop을 사용하십시오 (`className` 사용 금지).
- **Prop Naming:** HTML 기본 속성과의 충돌 방지를 위해 `inputSize`, `selectSize`와 같이 명명하십시오.

## 6. 다국어 지원 (i18n)

### 6.1 전략 및 저장 구조
- **모듈별 관리**: 다국어 키는 `src/standard/[module]/locales/` 또는 `src/custom/[tenant]/[module]/locales/`에 JSON 형태로 저장합니다.
- **계층 구조**: JSON 내부는 도메인/컴포넌트 단위의 계층 구조를 가집니다 (예: `main.tabs.all`).
- **Fallback 로직**: `useCoreTranslation`은 호출 시 지정된 네임스페이스 뒤에 자동으로 `common`을 추가하여, 특정 키가 없을 경우 공통 문구에서 찾아 출력합니다.

### 6.2 호출 가이드 및 문법
- **기본 호출**: `const { t } = useCoreTranslation(['contract', 'common'])`
- **동적 데이터 처리**: JSON에 `{{value}}`를 정의하고 `t('key', { value: 'data' })`로 전달합니다.
- **한국어 조사 처리**: 자동 조사 대응이 필요한 경우 문구 뒤에 `[[가]]`, `[[를]]` 등을 붙여 정의합니다 (예: `{{title}}[[를]] 승인하시겠습니까?`).
- **테넌트 오버라이드**: 특정 고객사에서만 문구를 바꿔야 할 경우, `tenant.config.ts`의 `i18n` 설정을 통해 `overrides` 객체를 `useCoreTranslation`의 두 번째 인자로 주입합니다.

### 6.3 라우팅 규칙
- URL은 `/:lang/...` (예: `/ko/contract`) 구조를 따르며, `useI18nSync` 훅을 통해 URL 상태와 i18next 상태를 동기화합니다.

## 7. 협업 및 변경 프로세스
1. **의사결정 투명성 (Pros & Cons)**: 아키텍처 변경, 대규모 리팩토링, 혹은 여러 기술적 대안 중 하나를 선택할 때는 반드시 각 방안의 **장점(Pros)과 단점(Cons)**을 명확히 제시하여 사용자가 판단할 수 있게 합니다.
2. **플랜 준수 (Plan Adherence)**: 전략(Strategy/Plan) 단계에서 합의된 명칭, 폴더 구조, 로직은 실행 단계에서 임의로 변경하지 않고 철저히 준수합니다. 변경이 필요한 경우 반드시 다시 플랜 모드를 거쳐 합의합니다.
3. **적응형 자기 검증 필수 (Adaptive Self-Validation)**: 모든 작업의 마지막 단계에서 변경 사항의 성격과 규모를 스스로 분석하여, 아래 기준에 따라 적절한 검증 명령어를 반드시 실행해야 합니다. 사용자에게 결과를 보고하기 전 에러를 스스로 찾아 해결하는 것을 원칙으로 합니다.
   - **Tier 1 (단순 코드 변경)**: 기존 컴포넌트나 비즈니스 로직 내부의 단순 수정 (구조 변경이나 설정 파일 변경 없음).
     👉 실행: `pnpm tsc --noEmit`
   - **Tier 2 (구조 변경)**: 파일 추가/삭제/이동, 컴포넌트 구조 변경, 설정 파일(`package.json`, `vite.config.ts` 등) 또는 아키텍처 주요 파일(`registry.ts`, `tenant.config.ts` 등) 수정.
     👉 실행: `pnpm build`
   - **Tier 3 (중요/대규모 변경)**: `src/core/` 하위 핵심 모듈 변경, 시스템 전반에 영향을 미치는 리팩토링, 또는 변경 분량이 많아 사이드 이펙트가 우려되는 경우.
     👉 실행: 관련된 E2E 테스트 선별 실행 (`pnpm exec playwright test e2e/관련_테스트_경로`) 또는 전체 테스트.
