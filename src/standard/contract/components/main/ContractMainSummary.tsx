import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/uikit/form/Button';
import { BarChart } from '@/uikit/chart/BarChart';
import { DataTable } from '@/uikit/table/DataTable';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

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
  const { t } = useCoreTranslation('contract');

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
      header: t('list.header.id'),
    },
    {
      accessorKey: 'title',
      header: t('list.header.title'),
    },
    {
      accessorKey: 'status',
      header: t('list.header.status'),
    },
    {
      id: 'action',
      header: t('main.summary_action'),
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
          {t('main.summary_detail')}
        </Button>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 text-sm font-bold text-slate-800">{t('main.chart_title')}</div>
        <BarChart
          data={chartData}
          xKey="status"
          series={[{ dataKey: 'count', name: t('main.chart_count'), color: chartColor }]}
          height={240}
          onBarClick={({ row }) => {
            const value = String(row.status ?? '').toLowerCase();
            onBarClick(value);
          }}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 text-sm font-bold text-slate-800">{t('main.table_title')}</div>
        <DataTable
          data={filtered}
          columns={tableColumns}
          globalFilterPlaceholder={t('main.table_search_placeholder')}
          onRowClick={(row) => onRowClick(row.id)}
          uniqueClassName="ui-standard-main-table"
        />
      </div>
    </div>
  );
}