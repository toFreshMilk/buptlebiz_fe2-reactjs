// src/core/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import KoreanPostpositionProcessor from 'i18next-korean-postposition-processor';
import resourcesToBackend from 'i18next-resources-to-backend';

// [1] Glob 패턴: shared/locales 폴더 구조에 맞춤
// 예: /src/standard/shared/locales/ko/contract.json
const standardLocales = import.meta.glob('/src/standard/shared/locales/*/*.json');

i18n
  .use(initReactI18next)
  .use(KoreanPostpositionProcessor as any)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // [2] Key 생성: 언어 폴더 -> 네임스페이스 파일
      const targetKey = `/src/standard/shared/locales/${language}/${namespace}.json`;

      if (standardLocales[targetKey]) {
        return standardLocales[targetKey]().then((mod: any) => mod.default);
      }

      return Promise.resolve({});
    }),
  )
  .init({
    // 기본 언어 설정
    lng: 'ko',
    fallbackLng: 'ko',

    // 네임스페이스 설정
    // common: 기본 공통어, contract: 계약 모듈 등등
    ns: ['common', 'contract'],
    defaultNS: 'common',

    // 동적 로딩 활성화
    partialBundledLanguages: true,

    interpolation: { escapeValue: false },

    // ✅ 핵심: addResourceBundle(=store added) 시점에도 react가 리렌더 되도록
    react: {
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
    },
  });

export default i18n;
