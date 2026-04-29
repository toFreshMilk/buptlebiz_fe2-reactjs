import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import KoreanPostpositionProcessor from 'i18next-korean-postposition-processor';
import resourcesToBackend from 'i18next-resources-to-backend';
import { I18N_CONFIG } from '@/core/config/tenant.config';
import { STANDARD_I18N_OWNER_BY_NAMESPACE } from '@/standard/registry';

// [1] Glob 패턴: 각 도메인별 폴더에서 locales를 가져옵니다.
// 예: /src/standard/contract/locales/ko/contract.json
const standardLocales = import.meta.glob('/src/standard/**/locales/*/*.json');

i18n
  .use(initReactI18next)
  .use(KoreanPostpositionProcessor as any)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // Registry에서 해당 네임스페이스의 오너(디렉토리명)를 찾습니다.
      const owner = (STANDARD_I18N_OWNER_BY_NAMESPACE as Record<string, string>)[namespace] || 'shared';
      const targetKey = `/src/standard/${owner}/locales/${language}/${namespace}.json`;

      if (standardLocales[targetKey]) {
        return standardLocales[targetKey]().then((mod: any) => mod.default);
      }

      return Promise.resolve({});
    }),
  )
  .init({
    lng: I18N_CONFIG.defaultLang,
    fallbackLng: I18N_CONFIG.defaultLang,
    ns: ['common', 'contract'],
    defaultNS: 'common',
    partialBundledLanguages: true,
    interpolation: { escapeValue: false },
    react: {
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
    },
  });

export default i18n;
