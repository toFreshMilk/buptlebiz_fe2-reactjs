import { ReactNode } from 'react';
// APR은 Button 스타일이 다를 수도 있고 위치도 다를 수 있음

interface ContractMainProps {
  // Standard와 동일한 인터페이스 유지 (그래야 갈아끼우기 가능)
  contracts: any[];
  isLoading: boolean;
  tenantId: string;
  onCreate: () => void;
  sidebar: ReactNode;
  list: ReactNode;
}

const AprContractMain = ({ tenantId, onCreate, sidebar, list }: ContractMainProps) => {
  return (
    <div className="flex w-full bg-gray-100 min-h-screen">
      {/* APR Custom Sidebar Wrapper */}
      <div className="border-r border-gray-300 shadow-xl z-10 bg-slate-900 text-white">{sidebar}</div>

      <div className="flex-1 p-8">
        {/* APR Custom Header */}
        <div className="mb-8 border-b pb-4 flex justify-between">
          <h2 className="text-3xl font-serif text-rose-700">APR Contracts ({tenantId})</h2>
          <button className="bg-rose-600 text-white px-6 py-2 rounded-full" onClick={onCreate}>
            + 생성하기
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[500px]">{list}</div>
      </div>
    </div>
  );
};

export default AprContractMain;
