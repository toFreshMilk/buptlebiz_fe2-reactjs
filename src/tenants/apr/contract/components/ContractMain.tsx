import { ReactNode } from 'react';

interface Props {
    sidebar: ReactNode;
    children: ReactNode;
}

const AprContractMain = ({ sidebar, children }: Props) => {
    return (
        <div className="flex w-full bg-gray-100">
            {/* APR은 사이드바 영역이 더 넓거나 스타일이 다름 */}
            <div className="border-r border-gray-300 shadow-xl z-10">
                {sidebar}
            </div>

            <div className="flex-1 p-8">
                <div className="bg-white rounded-xl shadow-sm p-6 min-h-[500px]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AprContractMain;
