// src/custom/apr/contract/components/ContractSidebar.tsx
const AprContractSidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-[calc(100vh-64px)] hidden lg:block">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">APR Contracts</h3>
        <ul className="space-y-2">
          <li className="px-3 py-2 bg-red-600 rounded-md text-sm font-medium cursor-pointer">Priority Contracts</li>
          <li className="px-3 py-2 text-gray-300 hover:text-white text-sm cursor-pointer">Hospital Agreements</li>
          <li className="px-3 py-2 text-gray-300 hover:text-white text-sm cursor-pointer">Supplier Forms</li>
        </ul>
      </div>
    </aside>
  );
};

export default AprContractSidebar;
