import { useRouteError } from 'react-router-dom';
import Button from '@/uikit/form/Button';

const TenantError = () => {
    const error: any = useRouteError();

    return (
        <div className="p-10 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong!</h2>
            <p className="text-gray-600 mb-6">{error.statusText || error.message}</p>
            <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
    );
};

export default TenantError;
