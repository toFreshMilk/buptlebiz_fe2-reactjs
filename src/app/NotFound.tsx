import { Link } from 'react-router-dom';
import { Button } from '@/uikit/form/Button';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

const NotFound = () => {
  const { t } = useCoreTranslation('common');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">{t('error.notFound', { defaultValue: 'Page not found' })}</p>
      <Link to="/">
        <Button>{t('error.goHome', { defaultValue: 'Go Home' })}</Button>
      </Link>
    </div>
  );
};

export default NotFound;