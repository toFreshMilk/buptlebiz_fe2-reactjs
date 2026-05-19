import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Button } from '@/core/uikit/form/Button';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

const InternalError = () => {
  const error = useRouteError();
  const { t } = useCoreTranslation('common');

  let errorMessage = 'Unknown Error';
  let title = 'Something went wrong';

  if (isRouteErrorResponse(error)) {
    // loader 등에서 throw new Response(...) 한 경우
    errorMessage = error.data || error.statusText;
    title = `${error.status} Error`;
    
    if (error.status === 404) {
      title = '404';
      errorMessage = t('error.notFound');
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error && typeof (error as any).message === 'string') {
    errorMessage = (error as any).message;
  }

  return (
    <div className="p-10 text-center flex flex-col items-center justify-center min-h-[60vh] bg-white border-2 border-dashed border-slate-200 rounded-3xl m-6">
      <div className="text-sm font-bold text-blue-500 tracking-widest mb-2 uppercase">Workspace Error</div>
      <h2 className="text-6xl font-bold text-slate-300 mb-4">{title}</h2>
      <p className="text-xl text-slate-600 mb-8">{errorMessage}</p>
      
      {isRouteErrorResponse(error) && error.status === 404 ? (
        <Link to="/">
          <Button>{t('error.goHome')}</Button>
        </Link>
      ) : (
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      )}
    </div>
  );
};

export default InternalError;
