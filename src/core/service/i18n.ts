import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { KoreanPostpositionProcessor, default_testers, default_modifiers } from 'i18next-korean-postposition-processor';
import resourcesToBackend from 'i18next-resources-to-backend';
import { STANDARD_I18N_OWNER_BY_NAMESPACE } from '@/standard/registry';
import { deepMerge } from '@/core/utils/object.util';
import { invariant } from '@/core/utils/invariant';

const quoteModifier = (str: string) => {
  let result = str;
  while (result.length > 0 && (result.endsWith("'") || result.endsWith('"'))) {
    result = result.slice(0, -1);
  }
  return result;
};

const koreanPostpositionProcessor = new KoreanPostpositionProcessor({
  testers: [...default_testers],
  modifiers: [...default_modifiers, quoteModifier],
});

const standardLocales = import.meta.glob('/src/standard/**/locales/*/*.json');
const customLocales = import.meta.glob('/src/custom/**/locales/*/*.json');

i18n
  .use(initReactI18next)
  .use(koreanPostpositionProcessor as any)
  .use(
    resourcesToBackend(async (language: string, namespace: string) => {
      const ownerMap: Record<string, string> = STANDARD_I18N_OWNER_BY_NAMESPACE;
      const owner = ownerMap[namespace];
      invariant(owner, `[i18n 에러] 네임스페이스 '${namespace}'가 STANDARD_I18N_OWNER_BY_NAMESPACE에 등록되지 않았습니다.`);

      const hostname = window.location.hostname;
      const tenantId = hostname.split('.')[0];
      invariant(tenantId, '[i18n 에러] 호스트네임에서 테넌트 ID를 파싱할 수 없습니다. 시스템이 현재 테넌트를 식별할 수 없습니다.');

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
    postProcess: ['korean-postposition'],
    interpolation: { escapeValue: false },
    // 기본 언어(lng) 하드코딩 제거: 언어 결정은 이제 useI18nSync가 설정 파일(config)을 바탕으로 완전히 제어합니다.
    react: {
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
    },
  });

export default i18n;
