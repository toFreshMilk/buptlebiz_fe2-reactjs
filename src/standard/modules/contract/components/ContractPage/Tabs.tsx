import { Button } from '@/core/uikit/form/Button';

type TabKey = 'all' | 'draft' | 'review' | 'active';

export interface TabsProps {
  tabs: { k: TabKey; label: string }[];
  activeTab: TabKey;
  primaryColor: string;
  onSelect: (k: TabKey) => void;
}

export default function Tabs({ tabs, activeTab, primaryColor, onSelect }: TabsProps) {
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