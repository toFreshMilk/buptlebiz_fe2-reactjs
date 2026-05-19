import { Slot } from '@/core/uikit/layout/Slot';

const ContractPage = () => {
  return (
    <div className="flex gap-6 p-6 lg:p-10">
      <Slot name="ContractSidebar" />
      <section className="flex-1 space-y-4">
        <Slot name="ContractAprHeader" />
        <Slot name="ContractAprBoard" />
      </section>
    </div>
  );
};

export default ContractPage;
