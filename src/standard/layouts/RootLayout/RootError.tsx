import { Link, useRouteError } from 'react-router-dom';
import { Button } from '@/core/uikit/form/Button';

const RootError = () => {
  const error: any = useRouteError();
  const errorMessage = error?.message || 'An unexpected error occurred.';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">500</h1>
      <p className="text-xl text-gray-600 mb-8">{errorMessage}</p>
      <Link to="/">
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
};

export default RootError;