import React, { ReactNode } from 'react';

interface ContractMainProps {
    sidebar: ReactNode;
    children: ReactNode; // 실제 리스트(ContractList)가 들어갈 영역
}

const ContractMain = ({ sidebar, children }: ContractMainProps) => {
    return (
        <div className="flex w-full">
            {/* Sidebar Slot */}
            {sidebar}

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 bg-gray-50">
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ContractMain;
