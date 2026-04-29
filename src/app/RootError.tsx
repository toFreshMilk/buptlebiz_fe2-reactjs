import { Link } from 'react-router-dom';
import { Button } from '@/uikit/form/Button';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

const RootError = () => {
  const { t } = useCoreTranslation('common');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">500</h1>
      <p className="text-xl text-gray-600 mb-8">{t('error.root.message', { defaultValue: 'Root Error' })}</p>
      <Link to="/">
        <Button>{t('error.goHome', { defaultValue: 'Go Home' })}</Button>
      </Link>
    </div>
  );
};

export default RootError;