import { useRouteError } from 'react-router-dom';
import { Button } from '@/uikit/form/Button';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

const InternalError = () => {
  const error: any = useRouteError();
  const { t } = useCoreTranslation('common');

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">{t('error.internal.title')}</h2>
      <p className="text-gray-600 mb-6">{error.statusText || error.message}</p>
      <Button onClick={() => window.location.reload()}>{t('error.refresh')}</Button>
    </div>
  );
};

export default InternalError;