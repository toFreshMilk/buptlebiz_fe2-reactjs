// src/core/hooks/useCoreTranslation.ts

import { useEffect } from 'react';
import { useTranslation, UseTranslationOptions } from 'react-i18next';
import i18nInstance from '../i18n/i18n';

/**
 * Core 다국어 훅 (동적 주입 지원)
 * @param ns - 사용할 네임스페이스 (예: 'contract')
 * @param overrides - (선택) 커스텀 모듈에서 덮어쓸 JSON 데이터
 */
type Overrides = Record<string, any>;

// ✅ 동일 overrides 객체에 대해 (lang|ns) 조합은 1회만 주입 (부하 최소화)
const injectedCache = new WeakMap<Overrides, Set<string>>();

function getActiveLang(i18n: typeof i18nInstance) {
  return i18n.resolvedLanguage || i18n.language || 'ko';
}

function isInjected(overrides: Overrides, lang: string, ns: string) {
  return injectedCache.get(overrides)?.has(`${lang}__${ns}`) ?? false;
}

function markInjected(overrides: Overrides, lang: string, ns: string) {
  const key = `${lang}__${ns}`;
  const set = injectedCache.get(overrides) ?? new Set<string>();
  set.add(key);
  injectedCache.set(overrides, set);
}

export function useCoreTranslation(ns: string, overrides?: Overrides, options?: UseTranslationOptions<any>) {
  const { t, ready } = useTranslation(ns, options);

  useEffect(() => {
    // 오버라이드 데이터가 있고, 아직 주입 안 했으면 실행
    if (!overrides) return;

    const inject = () => {
      const lang = getActiveLang(i18nInstance);

      // ✅ 동일 overrides + 동일 (lang,ns)는 최초 1회만 실행
      if (isInjected(overrides, lang, ns)) return;

      i18nInstance.addResourceBundle(
        lang,
        ns,
        overrides,
        true, // deep merge
        true, // overwrite
      );

      markInjected(overrides, lang, ns);

      if (import.meta.env?.DEV) {
        console.log('[useCoreTranslation] injected', {
          lang,
          ns,
          sample_title: i18nInstance.getResource(lang, ns, 'title'),
        });
      }
    };

    // ✅ 핵심: standard(ns) 로딩이 끝난 "뒤"에 override를 마지막으로 주입
    // ready가 false여도, loadNamespaces 콜백이 ns 로딩 완료를 보장
    i18nInstance.loadNamespaces(ns).then(() => {
      inject();
    });

    // 언어가 바뀌면 해당 언어(ns)에 대해 다시 보장
    const onLanguageChanged = () => {
      i18nInstance.loadNamespaces(ns).then(() => {
        inject();
      });
    };

    i18nInstance.on('languageChanged', onLanguageChanged);

    return () => {
      i18nInstance.off('languageChanged', onLanguageChanged);
    };
  }, [ns, overrides]);

  return { t, ready, i18n: i18nInstance };
}
