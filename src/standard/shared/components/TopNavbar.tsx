// src/standard/shared/components/TopNavbar.tsx
import { Link } from 'react-router-dom';

const TopNavbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-6">
      {/* Logo Area */}
      <div className="flex items-center gap-4">
        <Link to={`/`} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
          <span className="text-xl font-bold text-gray-800">BuptleBiz</span>
        </Link>
      </div>

      {/* Global Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        <Link to={`/contract`} className="hover:text-blue-600 transition-colors">
          Contracts
        </Link>
        <Link to={`/compliance`} className="hover:text-blue-600 transition-colors">
          Compliance
        </Link>
        <Link to={`/report`} className="hover:text-blue-600 transition-colors">
          Reports
        </Link>
      </nav>

      {/* User Menu */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
      </div>
    </header>
  );
};

export default TopNavbar;
