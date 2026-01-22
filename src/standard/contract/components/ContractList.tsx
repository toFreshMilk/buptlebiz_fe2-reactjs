// src/standard/contract/components/ContractList.tsx
import { Link } from 'react-router-dom';
import { Contract } from '../types';
import { formatDate } from '@/core/utils/date.util';

interface ContractListProps {
    contracts: Contract[];
    isLoading: boolean;
}

const ContractList = ({ contracts, isLoading }: ContractListProps) => {
    if (isLoading) {
        return <div className="p-4 text-center">Loading contracts...</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {contracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <Link to={`${contract.id}`} className="text-blue-600 hover:text-blue-900 font-medium">
                                {contract.title}
                            </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    contract.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {contract.status}
                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contract.amount.toLocaleString()} KRW
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(contract.startDate)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContractList;
