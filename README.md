
3. 글로벌 css 고객사껀 어떻게 적용하지. v4 정책 확인.
4. 다국어
5. uri가 진실의 원천, nuqs
8. ui kit 정리하기. 외부저장소로 올려도 되지 않나? pnpm에 올리기?


2. Tailwind v4 설정 파일의 중복성
   구조도에 tailwind.config.ts가 포함되어 있으나, Tailwind CSS v4는 JS/TS 설정 파일을 제거하고 CSS 우선 설정(@theme)으로 전환하는 것을 핵심 변경 사항으로 내세우고 있습니다.
   ​
   ​

비효율성: v4 환경에서 tailwind.config.ts를 유지하는 것은 레거시 호환성을 위한 것이며, v4의 성능 이점과 "Zero-configuration" 철학을 온전히 활용하지 못하게 합니다. CSS 변수 기반의 테마 설정이 권장됩니다.
​

권고: 전역 CSS 파일(globals.css) 내 @theme 블록으로 설정을 이관하고 tailwind.config.ts를 제거하여 빌드 복잡도를 낮춰야 합니다.
