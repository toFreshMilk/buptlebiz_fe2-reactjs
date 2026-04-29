import { Button } from '@/uikit/form/Button';

type TabKey = 'all' | 'draft' | 'review' | 'active';

export interface ContractMainTabsProps {
  tabs: { k: TabKey; label: string }[];
  activeTab: TabKey;
  primaryColor: string;
  onSelect: (k: TabKey) => void;
}

export default function ContractMainTabs({ tabs, activeTab, primaryColor, onSelect }: ContractMainTabsProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 flex gap-2">
      {tabs.map((x) => (
        <Button
          key={x.k}
          shape="xl"
          variant={activeTab === x.k ? 'solid' : 'ghost'}
          tone={activeTab === x.k ? 'slate' : 'slate'}
          uniqueClassName={`ui-standard-main-tab-${x.k}`}
          style={activeTab === x.k ? { backgroundColor: primaryColor } : undefined}
          onPress={() => onSelect(x.k)}
        >
          {x.label}
        </Button>
      ))}
    </div>
  );
}