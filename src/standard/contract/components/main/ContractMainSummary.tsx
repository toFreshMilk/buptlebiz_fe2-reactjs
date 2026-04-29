import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/uikit/form/Button';
import { BarChart } from '@/uikit/chart/BarChart';
import { DataTable } from '@/uikit/table/DataTable';

type ContractItem = {
  id: number | string;
  title: string;
  status: string;
};

export interface ContractMainSummaryProps {
  filtered: ContractItem[];
  chartColor: string;
  onBarClick: (status: string) => void;
  onRowClick: (id: number | string) => void;
}

export default function ContractMainSummary({
  filtered,
  chartColor,
  onBarClick,
  onRowClick,
}: ContractMainSummaryProps) {
  const chartData = [
    {
      status: 'Draft',
      count: filtered.filter((item) => item.status.toLowerCase() === 'draft').length,
    },
    {
      status: 'Review',
      count: filtered.filter((item) => item.status.toLowerCase() === 'review').length,
    },
    {
      status: 'Active',
      count: filtered.filter((item) => item.status.toLowerCase() === 'active').length,
    },
  ];

  const tableColumns: Array<ColumnDef<ContractItem, unknown>> = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'title',
      header: '계약명',
    },
    {
      accessorKey: 'status',
      header: '상태',
    },
    {
      id: 'action',
      header: '액션',
      cell: ({ row }) => (
        <Button
          variant="outline"
          tone="slate"
          size="sm"
          onPress={(event) => {
            event.stopPropagation();
            onRowClick(row.original.id);
          }}
        >
          상세
        </Button>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 text-sm font-bold text-slate-800">상태 분포 차트 (Recharts 샘플)</div>
        <BarChart
          data={chartData}
          xKey="status"
          series={[{ dataKey: 'count', name: '건수', color: chartColor }]}
          height={240}
          onBarClick={({ row }) => {
            const value = String(row.status ?? '').toLowerCase();
            onBarClick(value);
          }}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 text-sm font-bold text-slate-800">계약 테이블 (TanStack Table 샘플)</div>
        <DataTable
          data={filtered}
          columns={tableColumns}
          globalFilterPlaceholder="계약명 검색"
          onRowClick={(row) => onRowClick(row.id)}
          uniqueClassName="ui-standard-main-table"
        />
      </div>
    </div>
  );
}