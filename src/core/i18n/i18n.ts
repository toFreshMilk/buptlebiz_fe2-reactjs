// src/core/i18n/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import KoreanPostpositionProcessor from 'i18next-korean-postposition-processor';
import resourcesToBackend from 'i18next-resources-to-backend';

import standardSharedKo from '../../standard/shared/locales/ko.json';
import standardSharedEn from '../../standard/shared/locales/en.json';

// [1] 절대 경로 패턴 사용 (가장 안전함)
// '/src'로 시작하면 프로젝트 루트부터 찾으므로 상대경로(../..) 실수가 사라짐
const standardLocales = import.meta.glob('/src/standard/*/locales/*.json');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(KoreanPostpositionProcessor as any)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // shared는 이미 로드했으므로 패스
      if (namespace === 'shared') return null;

      // [2] Key 생성도 절대 경로로 통일
      const targetKey = `/src/standard/${namespace}/locales/${language}.json`;

      // [디버깅] 정확히 무엇을 찾고 있는지 확인
      // console.log(`[i18n] Looking for: ${targetKey}`);

      // [3] 매칭 시도
      if (standardLocales[targetKey]) {
        return standardLocales[targetKey]().then((mod: any) => mod.default);
      }

      console.warn(`[i18n] ❌ standardLocales: ${JSON.stringify(standardLocales)}`);
      console.warn(`[i18n] ❌ Resource NOT found for: ${targetKey}`);
      console.warn(`[i18n]    Current Namespace: '${namespace}'`);
      console.warn(`[i18n]    Current Language: '${language}'`);

      return Promise.resolve({}); // 에러 방지용 빈 객체
    }),
  )
  .init({
    resources: {
      ko: { shared: standardSharedKo },
      en: { shared: standardSharedEn },
    },
    lng: 'ko', // [추가] 초기 언어를 강제로 한국어로 고정
    fallbackLng: 'ko', // [수정] 영어를 못 찾으면 한국어를 보여주도록 변경
    ns: ['shared'],
    defaultNS: 'shared',
    partialBundledLanguages: true, // 필수
    interpolation: { escapeValue: false },
  });

export default i18n;
