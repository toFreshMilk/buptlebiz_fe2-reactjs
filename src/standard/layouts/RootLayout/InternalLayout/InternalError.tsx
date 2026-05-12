import { useRouteError } from 'react-router-dom';
import { Button } from '@/core/uikit/form/Button';

const InternalError = () => {
  const error: any = useRouteError();

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h2>
      <p className="text-slate-600 mb-6">{error?.message || 'Unknown Error'}</p>
      <Button onClick={() => window.location.reload()}>Refresh</Button>
    </div>
  );
};

export default InternalError;