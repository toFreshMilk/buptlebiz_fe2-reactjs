import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { useTenantService } from '@/core/hooks/useTenantModule';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';
import { Input } from '@/core/uikit/form/Input';
import { Button } from '@/core/uikit/form/Button';
import { LoadingBar } from '@/core/uikit/feedback/LoadingBar';
import type { AuthService } from '@/standard/modules/auth/services/auth.service';

export default function LoginPage() {
  const { tenantId } = useAppConfig();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { t } = useCoreTranslation(['common']);
  const AuthServiceClass = useTenantService<typeof AuthService>('AuthService');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await AuthServiceClass.login(tenantId, email, password);
      if (res.success) {
        navigate(`/${lang}/contract`, { replace: true });
      } else {
        setError(t('login.error'));
      }
    } catch (err: any) {
      setError(err.message || t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          {t('login.title')}
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              uniqueClassName="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              uniqueClassName="w-full"
            />
          </div>

          <Button 
            type="submit" 
            uniqueClassName="w-full mt-2" 
            disabled={loading}
          >
            {loading ? t('login.loading') : t('login.submit')}
          </Button>
        </form>
      </div>
      
      {loading && <LoadingBar />}
    </div>
  );
}