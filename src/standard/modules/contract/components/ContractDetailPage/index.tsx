import { Slot } from '@/core/uikit/layout/Slot';

const ContractDetailPage = () => {
  return (
    <div className="p-6 lg:p-10 space-y-6">
      <Slot name="ContractDetailTop" />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <Slot name="ContractDetailLeft" />
        </div>
        <div className="w-full lg:w-105 shrink-0">
          <Slot name="ContractDetailRight" />
        </div>
      </div>
    </div>
  );
};

export default ContractDetailPage;