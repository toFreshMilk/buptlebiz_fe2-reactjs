// src/core/hooks/useI18nSync.ts
import { useEffect } from 'react';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import i18n from '@/core/service/i18n';

export const useI18nSync = (lang?: string) => {
  const { config } = useAppConfig();
  const supportedLangs = config.features.i18n;
  const defaultLang = config.features.defaultLang || supportedLangs[0];

  const isInvalidLang = !!lang && !supportedLangs.includes(lang);

  useEffect(() => {
    // 유효한 언어일 때만 i18n 언어 변경
    const targetLang = lang || defaultLang;
    if (!isInvalidLang && targetLang && i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  }, [lang, defaultLang, isInvalidLang]);

  return { isInvalidLang, defaultLang };
};
