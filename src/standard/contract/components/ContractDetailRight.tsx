import Section from '@/uikit/layout/Section';

const ContractDetailRight = () => {
    return (
        <div className="space-y-6">
            <Section title="Progress">
                <div className="relative pb-8">
                    {/* Simple Timeline */}
                    <div className="border-l-2 border-gray-200 ml-3 space-y-8 pl-6 py-2">
                        <div className="relative">
                            <span className="absolute -left-[31px] bg-blue-500 h-4 w-4 rounded-full ring-4 ring-white"></span>
                            <p className="text-sm font-medium">Contract Created</p>
                            <p className="text-xs text-gray-500">2024-01-01</p>
                        </div>
                        <div className="relative">
                            <span className="absolute -left-[31px] bg-gray-200 h-4 w-4 rounded-full ring-4 ring-white"></span>
                            <p className="text-sm font-medium text-gray-500">Approval Pending</p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default ContractDetailRight;
