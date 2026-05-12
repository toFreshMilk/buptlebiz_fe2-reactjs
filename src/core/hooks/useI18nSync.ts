import { useAppConfig } from '@/core/contexts/AppConfigContext';
import i18n from '@/core/service/i18n';

// Suspense 통합을 위한 프로미스 캐시
const promiseCache = new Map<string, Promise<void>>();

export const useI18nSync = (lang?: string) => {
  const { config } = useAppConfig();
  const supportedLangs = config.features.i18n;
  const defaultLang = supportedLangs[0];

  const isInvalidLang = !!lang && !supportedLangs.includes(lang);
  const targetLang = lang || defaultLang;

  // React Suspense 통합: 언어 변경이 필요하면 Promise를 던져(throw) 렌더링을 중단시킴.
  // 상위의 <Suspense fallback={<LoadingBar />}>가 이를 캐치하여 로딩바를 보여줍니다.
  if (!isInvalidLang && targetLang && i18n.language !== targetLang) {
    let promise = promiseCache.get(targetLang);
    if (!promise) {
      promise = i18n.changeLanguage(targetLang).then(() => {
        promiseCache.delete(targetLang);
      });
      promiseCache.set(targetLang, promise);
    }
    throw promise;
  }

  return { isInvalidLang, defaultLang };
};
