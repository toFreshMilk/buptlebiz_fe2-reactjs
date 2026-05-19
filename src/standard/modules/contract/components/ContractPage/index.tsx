export type TabKey = 'all' | 'draft' | 'review' | 'active';
import { Slot } from '@/core/uikit/layout/Slot';

const ContractPage = () => {
  return (
    <div className="flex gap-6 p-6 lg:p-10">
      <Slot name="ContractSidebar" />
      
      <section className="flex-1 space-y-4">
        <Slot name="ContractHeader" />
        <Slot name="ContractTabs" />

        <div className="space-y-3">
          <Slot name="ContractList" />
        </div>
      </section>
    </div>
  );
};

export default ContractPage;