import { Link } from 'react-router-dom';
import { useAppConfig } from '@/core/contexts/AppConfigContext';

const ContractSidebar = () => {
    const { tenantId } = useAppConfig();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] hidden lg:block">
            <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Contract Menu
                </h3>
                <ul className="space-y-1">
                    <li>
                        <Link
                            to={`/${tenantId}/contract`}
                            className="block px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium text-sm"
                        >
                            All Contracts
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/${tenantId}/contract?status=draft`}
                            className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 text-sm"
                        >
                            Drafts
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/${tenantId}/contract?status=approval`}
                            className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 text-sm"
                        >
                            Pending Approval
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default ContractSidebar;
