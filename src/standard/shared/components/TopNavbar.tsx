import React from 'react';
import { Link } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

const TopNavbar = () => {
    const { tenantId } = useAppConfig();

    return (
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-6">
            {/* Logo Area */}
            <div className="flex items-center gap-4">
                <Link to={`/${tenantId}`} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        B
                    </div>
                    <span className="text-xl font-bold text-gray-800">BuptleBiz</span>
                </Link>
            </div>

            {/* Global Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                <Link to={`/${tenantId}/contract`} className="hover:text-blue-600 transition-colors">
                    Contracts
                </Link>
                <Link to={`/${tenantId}/compliance`} className="hover:text-blue-600 transition-colors">
                    Compliance
                </Link>
                <Link to={`/${tenantId}/report`} className="hover:text-blue-600 transition-colors">
                    Reports
                </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                    <svg className="w-full h-full text-gray-400 p-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
            </div>
        </header>
    );
};

export default TopNavbar;
