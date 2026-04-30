import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import KoreanPostpositionProcessor from 'i18next-korean-postposition-processor';
import resourcesToBackend from 'i18next-resources-to-backend';
import { STANDARD_I18N_OWNER_BY_NAMESPACE } from '@/standard/registry';
import { deepMerge } from '@/core/utils/object.util';

const standardLocales = import.meta.glob('/src/standard/**/locales/*/*.json');
const customLocales = import.meta.glob('/src/custom/**/locales/*/*.json');

i18n
  .use(initReactI18next)
  .use(KoreanPostpositionProcessor as any)
  .use(
    resourcesToBackend(async (language: string, namespace: string) => {
      const owner = (STANDARD_I18N_OWNER_BY_NAMESPACE as Record<string, string>)[namespace] || 'shared';
      
      const hostname = window.location.hostname;
      const tenantId = hostname.split('.')[0] || 'demo';

      const standardKey = `/src/standard/${owner}/locales/${language}/${namespace}.json`;
      const customKey = `/src/custom/${tenantId}/${owner}/locales/${language}/${namespace}.json`;

      let base = {};
      let override = {};

      if (standardLocales[standardKey]) {
        base = await standardLocales[standardKey]().then((mod: any) => mod.default);
      }

      if (customLocales[customKey]) {
        override = await customLocales[customKey]().then((mod: any) => mod.default);
      }

      return deepMerge(base, override);
    }),
  )
  .init({
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