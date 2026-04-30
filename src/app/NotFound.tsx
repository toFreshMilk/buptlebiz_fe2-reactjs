import { Link } from 'react-router-dom';
import { Button } from '@/uikit/form/Button';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

const NotFound = () => {
  const { t } = useCoreTranslation('common');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h1 className="text-9xl font-black text-slate-200 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">{t('error.notFound')}</p>
      <Link to="/">
        <Button>{t('error.goHome')}</Button>
      </Link>
    </div>
  );
};

export default NotFound;