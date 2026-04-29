import type { ReactNode } from 'react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import type { DataKey } from 'recharts';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

export type ChartRow = Record<string, string | number | null | undefined>;

export interface BarSeries<T extends ChartRow> {
  dataKey: DataKey<T>;
  name?: string;
  color?: string;
  stackId?: string;
  radius?: [number, number, number, number];
  minPointSize?: number;
}

interface Props<T extends ChartRow> {
  data: T[];
  xKey: keyof T & string;
  series: Array<BarSeries<T>>;
  height?: number;
  yAxisWidth?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  uniqueClassName?: string;
  emptyFallback?: ReactNode;
  tooltipLabelFormatter?: (label: string | number) => ReactNode;
  tooltipValueFormatter?: (value: number, name: string) => ReactNode;
  onBarClick?: (payload: { seriesKey: DataKey<T>; row: T; index: number }) => void;
}

export function BarChart<T extends ChartRow>({
  data,
  xKey,
  series,
  height = 280,
  yAxisWidth = 44,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  uniqueClassName,
  emptyFallback,
  tooltipLabelFormatter,
  tooltipValueFormatter,
  onBarClick,
}: Props<T>) {
  const { t } = useCoreTranslation('common');
  const defaultEmptyFallback = <div className="text-sm text-slate-400">{t('uikit.chart.emptyText', { defaultValue: '표시할 데이터가 없습니다.' })}</div>;

  if (!data.length || !series.length) {
    return <div className={uniqueClassName}>{emptyFallback ?? defaultEmptyFallback}</div>;
  }

  return (
    <div className={uniqueClassName}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />}
          {showXAxis && <XAxis dataKey={xKey as string} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />}
          {showYAxis && <YAxis width={yAxisWidth} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />}
          {showTooltip && (
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              labelFormatter={(label) => (tooltipLabelFormatter ? tooltipLabelFormatter(label) : String(label))}
              formatter={(value: unknown, name: unknown) => {
                const numeric = typeof value === 'number' ? value : Number(value ?? 0);
                const key = String(name ?? '');
                if (tooltipValueFormatter) return tooltipValueFormatter(numeric, key);
                return [`${numeric}`, key];
              }}
            />
          )}
          {showLegend && <Legend />}

          {series.map((s) => (
            <Bar
              key={s.dataKey as string}
              dataKey={s.dataKey}
              name={s.name ?? (s.dataKey as string)}
              fill={s.color ?? '#2563eb'}
              stackId={s.stackId}
              radius={s.radius ?? [6, 6, 0, 0]}
              minPointSize={s.minPointSize ?? 0}
              onClick={(row, index) => {
                const safeRow = row?.payload as T | undefined;
                if (!safeRow || typeof index !== 'number') return;
                onBarClick?.({ seriesKey: s.dataKey, row: safeRow, index });
              }}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}