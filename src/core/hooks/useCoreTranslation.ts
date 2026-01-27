// src/core/hooks/useCoreTranslation.ts

import { useEffect, useRef } from 'react';
import { useTranslation, UseTranslationOptions } from 'react-i18next';
import i18nInstance from '../i18n/i18n';

/**
 * Core 다국어 훅 (동적 주입 지원)
 * @param ns - 사용할 네임스페이스 (예: 'contract')
 * @param overrides - (선택) 커스텀 모듈에서 덮어쓸 JSON 데이터
 */
export function useCoreTranslation(ns: string, overrides?: Record<string, any>, options?: UseTranslationOptions<any>) {
  const { t, ready } = useTranslation(ns, options);
  const hasInjected = useRef(false);

  useEffect(() => {
    // 오버라이드 데이터가 있고, 아직 주입 안 했으면 실행
    if (overrides && !hasInjected.current) {
      const currentLang = i18nInstance.resolvedLanguage || i18nInstance.language || 'ko';

      i18nInstance.addResourceBundle(
        currentLang,
        ns,
        overrides,
        true, // deep merge
        true, // overwrite
      );

      hasInjected.current = true;
    }
  }, [ns, overrides]);

  return { t, ready, i18n: i18nInstance };
}
