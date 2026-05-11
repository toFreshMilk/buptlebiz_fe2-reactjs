import { Link } from 'react-router-dom';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { LanguageSwitcher } from './LanguageSwitcher';

const TopNavbar = () => {
  const { t, i18n } = useCoreTranslation('common');
  const { config } = useAppConfig();

  const currentLang = i18n.language || config.features.i18n[0];

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-6">
      {/* Logo Area */}
      <div className="flex items-center gap-4">
        <Link to={`/${currentLang}`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
          <span className="text-xl font-bold text-gray-800">{t('app_name')}</span>
        </Link>
      </div>

      {/* Global Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        <Link to={`/${currentLang}/contract`} className="hover:text-blue-600 transition-colors">
          Contracts
        </Link>
        <Link to={`/${currentLang}/compliance`} className="hover:text-blue-600 transition-colors">
          Compliance
        </Link>
        <Link to={`/${currentLang}/report`} className="hover:text-blue-600 transition-colors">
          Reports
        </Link>
      </nav>

      {/* User Menu */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
      </div>
    </header>
  );
};

export default TopNavbar;
