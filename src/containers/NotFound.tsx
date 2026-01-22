// src/containers/NotFound.tsx
import { Link } from 'react-router-dom';
import Button from '@/uikit/form/Button';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page not found</p>
            <Link to="/">
                <Button>Go Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;
