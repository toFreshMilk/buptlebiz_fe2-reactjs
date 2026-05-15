import { Link, useParams } from 'react-router-dom';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useAuth } from '@/core/contexts/AuthContext';
import { useTenantService } from '@/core/hooks/useTenantModule';
import { Button } from '@/core/uikit/form/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { AuthService } from '@/standard/modules/auth/services/auth.service';

const TopNavbar = () => {
  const { t } = useCoreTranslation('common');
  const { config, tenantId } = useAppConfig();
  const { user, logout } = useAuth();
  const { lang } = useParams<{ lang: string }>();
  const AuthServiceClass = useTenantService<typeof AuthService>('AuthService');

  const currentLang = lang || config.features.i18n[0];

  const handleLogout = async () => {
    try {
      await AuthServiceClass.logout(tenantId);
    } catch (e) {
      console.error('로그아웃 API 호출에 실패했습니다:', e);
      alert(t('logout_error'));
    } finally {
      logout(); // API 성공 여부와 무관하게 로컬 상태 클리어 -> AuthGuard가 리다이렉트 처리함
    }
  };

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
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
            <Button variant="ghost" tone="rose" size="sm" onClick={handleLogout}>
              {t('logout')}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;
