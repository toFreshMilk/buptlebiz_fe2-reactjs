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

export function useCoreTranslation(namespaces: string | string[], overrides?: Overrides, options?: UseTranslationOptions<any>) {
  // Array of namespaces support
  const nsArray = Array.isArray(namespaces) ? namespaces : [namespaces];
  
  // Automatically append 'common' namespace at the end if not present, so we can fallback to it
  if (!nsArray.includes('common')) {
    nsArray.push('common');
  }

  const { t, i18n, ready } = useTranslation(nsArray, { ...options, useSuspense: false });

  // For overrides, we apply it to the first namespace (primary)
  const primaryNs = nsArray[0];

  useEffect(() => {
    if (!overrides || !primaryNs) return;

    let cancelled = false;

    const run = async () => {
      const lang = getActiveLang(i18n);
      const cache = getOverrideCache(i18n);
      const signature = getOverridesSignature(overrides);
      const cacheKey = `${lang}__${primaryNs}__${signature}`;

      if (cache.has(cacheKey)) return;

      try {
        if (typeof i18n.hasResourceBundle === 'function') {
          if (!i18n.hasResourceBundle(lang, primaryNs)) {
            await i18n.loadNamespaces(primaryNs);
          }
        } else {
          await i18n.loadNamespaces(primaryNs);
        }
      } catch (e) {
        console.error('[i18n] loadNamespaces failed:', e);
      }

      if (cancelled) return;
      i18n.addResourceBundle(lang, primaryNs, overrides, true, true);
      cache.add(cacheKey);
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
  }, [i18n, primaryNs, overrides]);

  return { t, ready, i18n };
}
