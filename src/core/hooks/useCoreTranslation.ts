import { useEffect } from 'react';
import { useTranslation, type UseTranslationOptions } from 'react-i18next';

type Overrides = Record<string, any>;

const OVERRIDE_CACHE_SYMBOL = Symbol.for('buptlebiz.i18n.overrideCache');
const overrideSignatureByIdentity = new WeakMap<Overrides, string>();

function getActiveLang(i18n: any) {
  return i18n?.resolvedLanguage || i18n?.language || 'ko';
}

function getOverrideCache(i18n: any) {
  const existing = i18n[OVERRIDE_CACHE_SYMBOL] as Set<string> | undefined;
  if (existing) return existing;

  const created = new Set<string>();
  i18n[OVERRIDE_CACHE_SYMBOL] = created;
  return created;
}

function stableStringify(value: any) {
  const seen = new WeakSet<object>();
  const walk = (v: any): any => {
    if (v === null || typeof v !== 'object') return v;
    if (seen.has(v)) return '[Circular]';
    seen.add(v);
    if (Array.isArray(v)) return v.map(walk);
    const out: Record<string, any> = {};
    for (const k of Object.keys(v).sort()) {
      out[k] = walk(v[k]);
    }
    return out;
  };
  try {
    return JSON.stringify(walk(value));
  } catch {
    return String(value);
  }
}

function getOverridesSignature(overrides: Overrides) {
  const cached = overrideSignatureByIdentity.get(overrides);
  if (cached) return cached;
  const sig = stableStringify(overrides);
  overrideSignatureByIdentity.set(overrides, sig);
  return sig;
}

export function useCoreTranslation(ns: string, overrides?: Overrides, options?: UseTranslationOptions<any>) {
  const { t, i18n, ready } = useTranslation(ns, { ...options, useSuspense: false });

  useEffect(() => {
    if (!overrides) return;

    let cancelled = false;

    const run = async () => {
      const lang = getActiveLang(i18n);
      const cache = getOverrideCache(i18n);
      const signature = getOverridesSignature(overrides);
      const cacheKey = `${lang}__${ns}__${signature}`;

      if (cache.has(cacheKey)) return;

      try {
        if (typeof i18n.hasResourceBundle === 'function') {
          if (!i18n.hasResourceBundle(lang, ns)) {
            await i18n.loadNamespaces(ns);
          }
        } else {
          await i18n.loadNamespaces(ns);
        }
      } finally {
        if (cancelled) return;
        i18n.addResourceBundle(lang, ns, overrides, true, true);
        cache.add(cacheKey);
      }
    };

    void run();

    const onLanguageChanged = () => {
      void run();
    };

    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      cancelled = true;
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, [i18n, ns, overrides]);

  return { t, ready, i18n };
}
