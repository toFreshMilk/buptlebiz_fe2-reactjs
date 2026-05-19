import { Slot } from '@/core/uikit/layout/Slot';

const ContractDetailPage = () => {
  return (
    <div className="p-6 lg:p-10 space-y-6">
      <div className="space-y-4">
        <Slot name="ContractDetailTopHeader" />
        <Slot name="ContractDetailTopProgress" />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <Slot name="ContractDetailLeftPanel" />
        </div>
        <div className="w-full lg:w-105 shrink-0 space-y-4">
          <Slot name="ContractDetailRightActions" />
          <Slot name="ContractDetailRightSchedule" />
          <Slot name="ContractDetailRightActivity" />
        </div>
      </div>
    </div>
  );
};

export default ContractDetailPage;
