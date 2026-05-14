import { useLocation, useNavigate } from 'react-router-dom';
import { Select } from '@/core/uikit/form/Select';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

const LANG_LABELS: Record<string, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

interface LanguageSwitcherProps {
  uniqueClassName?: string;
}

export function LanguageSwitcher({ uniqueClassName }: LanguageSwitcherProps) {
  const { i18n } = useCoreTranslation('common');
  const { config } = useAppConfig();
  const location = useLocation();
  const navigate = useNavigate();

  const supportedLangs = config.features.i18n;

  const languageOptions = supportedLangs.map((lang: string) => ({
    label: LANG_LABELS[lang] || lang.toUpperCase(),
    value: lang,
  }));

  const handleLanguageChange = (newLang: string) => {
    const currentPath = location.pathname;
    const newPath = currentPath.replace(/^\/[a-z]{2}\b/, `/${newLang}`);
    navigate(newPath + location.search);
  };

  const currentLang = i18n.language || config.features.i18n[0];

  return (
    <Select
      uniqueClassName={uniqueClassName}
      value={currentLang}
      options={languageOptions}
      onValueChange={handleLanguageChange}
    />
  );
}
