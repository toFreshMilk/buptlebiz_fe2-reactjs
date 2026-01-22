import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <Outlet />
        </div>
    );
};

export default RootLayout;
