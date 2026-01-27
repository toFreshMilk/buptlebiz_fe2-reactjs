// src/core/hooks/useCoreTranslation.ts
import { useEffect, useRef } from 'react';
import { useTranslation, UseTranslationOptions } from 'react-i18next';

// [수정] 우리가 만든 인스턴스를 직접 가져옵니다. (가장 확실함)
import i18nInstance from '../i18n/i18n';

export function useCoreTranslation(ns: string, overrides?: Record<string, any>, options?: UseTranslationOptions<any>) {
  // 컴포넌트 리렌더링을 위해 t 함수는 훅에서 가져옵니다.
  const { t, ready } = useTranslation(ns, options);

  const hasInjected = useRef(false);

  useEffect(() => {
    if (overrides && !hasInjected.current) {
      const currentLang = i18nInstance.resolvedLanguage || i18nInstance.language || 'ko';

      // [수정] 직접 가져온 인스턴스의 메서드를 사용합니다.
      i18nInstance.addResourceBundle(currentLang, ns, overrides, true, true);

      console.log(`[Core-i18n] Injected resources for '${ns}' namespace (${currentLang})`);

      hasInjected.current = true;
    }
  }, [ns, overrides]); // 의존성 배열에서 i18n 제거

  // i18n 객체도 필요하다면 직접 가져온 것을 반환
  return { t, i18n: i18nInstance, ready };
}
