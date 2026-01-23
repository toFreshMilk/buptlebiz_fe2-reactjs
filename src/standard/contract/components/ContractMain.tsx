import { ReactNode } from 'react';
import Button from '@/uikit/form/Button';

interface ContractMainProps {
  // Data
  contracts: any[]; // 타입은 DTO로 지정하면 더 좋음
  isLoading: boolean;
  tenantId: string;

  // Actions
  onCreate: () => void;

  // Slots
  sidebar: ReactNode;
  list: ReactNode; // ContractList 컴포넌트를 통째로 받음
}

const ContractMain = ({ tenantId, onCreate, sidebar, list }: ContractMainProps) => {
  return (
    <div className="flex h-full min-h-screen bg-gray-50">
      {/* 1. Sidebar Area */}
      <div className="w-64 border-r border-gray-200 bg-white">{sidebar}</div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Contracts</h1>
            <p className="text-sm text-gray-500 mt-1">
              Tenant: <span className="font-semibold text-blue-600 uppercase">{tenantId}</span>
            </p>
          </div>
          <Button onClick={onCreate}>New Contract</Button>
        </div>

        {/* Content (List) */}
        <div className="flex-1 bg-white rounded-lg shadow p-4">{list}</div>
      </div>
    </div>
  );
};

export default ContractMain;
