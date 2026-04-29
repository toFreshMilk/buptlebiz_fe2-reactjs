import { useState, type ReactNode } from 'react';
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Input } from '@/uikit/form/Input';
import { Button } from '@/uikit/form/Button';
import { useCoreTranslation } from '@/core/hooks/useCoreTranslation';

interface Props<T extends object> {
  data: T[];
  columns: Array<ColumnDef<T, unknown>>;
  uniqueClassName?: string;
  tableUniqueClassName?: string;
  headerRowUniqueClassName?: string;
  bodyRowUniqueClassName?: string;
  emptyText?: string;
  showToolbar?: boolean;
  showGlobalFilter?: boolean;
  globalFilterPlaceholder?: string;
  showPagination?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  controlledSorting?: SortingState;
  controlledPagination?: PaginationState;
  controlledGlobalFilter?: string;
  onSortingChange?: (next: SortingState) => void;
  onPaginationChange?: (next: PaginationState) => void;
  onGlobalFilterChange?: (next: string) => void;
  onRowClick?: (row: T) => void;
  onRowDoubleClick?: (row: T) => void;
  toolbarRightSlot?: ReactNode;
}

export function DataTable<T extends object>({
  data,
  columns,
  uniqueClassName,
  tableUniqueClassName,
  headerRowUniqueClassName,
  bodyRowUniqueClassName,
  emptyText,
  showToolbar = true,
  showGlobalFilter = true,
  globalFilterPlaceholder,
  showPagination = true,
  pageSizeOptions = [10, 20, 50],
  defaultPageSize = 10,
  controlledSorting,
  controlledPagination,
  controlledGlobalFilter,
  onSortingChange,
  onPaginationChange,
  onGlobalFilterChange,
  onRowClick,
  onRowDoubleClick,
  toolbarRightSlot,
}: Props<T>) {
  const { t } = useCoreTranslation('common');
  const defaultEmptyText = t('uikit.table.emptyText', { defaultValue: '데이터가 없습니다.' });
  const defaultGlobalFilterPlaceholder = t('uikit.table.searchPlaceholder', { defaultValue: '검색...' });

  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [internalGlobalFilter, setInternalGlobalFilter] = useState('');

  const sorting = controlledSorting ?? internalSorting;
  const pagination = controlledPagination ?? internalPagination;
  const globalFilter = controlledGlobalFilter ?? internalGlobalFilter;

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination, globalFilter },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      if (!controlledSorting) setInternalSorting(next);
      onSortingChange?.(next);
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater(pagination) : updater;
      if (!controlledPagination) setInternalPagination(next);
      onPaginationChange?.(next);
    },
    onGlobalFilterChange: (updater) => {
      const next = typeof updater === 'function' ? updater(globalFilter) : updater;
      if (!controlledGlobalFilter) setInternalGlobalFilter(next);
      onGlobalFilterChange?.(next);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const totalRows = data.length;
  const currentRows = table.getRowModel().rows;

  return (
    <section className={uniqueClassName}>
      {showToolbar && (
        <div className="mb-3 flex items-center gap-2">
          {showGlobalFilter && (
            <Input
              uniqueClassName="w-64"
              value={globalFilter}
              onValueChange={(value) => table.setGlobalFilter(value)}
              placeholder={globalFilterPlaceholder ?? defaultGlobalFilterPlaceholder}
              tone="slate"
              shape="xl"
            />
          )}

          <div className="ml-auto flex items-center gap-2">
            {toolbarRightSlot}
            <select
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm text-slate-700"
              value={String(table.getState().pagination.pageSize)}
              onChange={(event) => table.setPageSize(Number(event.target.value))}
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {t('uikit.table.itemsPerPage', { count: n, defaultValue: `${n}개` })}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className={`overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm ${tableUniqueClassName ?? ''}`}>
        <table className="w-full text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={`border-b border-slate-100 bg-slate-50/60 ${headerRowUniqueClassName ?? ''}`}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 font-semibold text-slate-500 select-none"
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <div className="inline-flex items-center gap-1">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: '▲',
                        desc: '▼',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-slate-100">
            {currentRows.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center text-slate-400" colSpan={columns.length}>
                  {emptyText ?? defaultEmptyText}
                </td>
              </tr>
            ) : (
              currentRows.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-slate-50/70 transition ${bodyRowUniqueClassName ?? ''}`}
                  onClick={() => onRowClick?.(row.original)}
                  onDoubleClick={() => onRowDoubleClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-slate-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <div>
            {t('uikit.table.paginationInfo', { 
               total: totalRows, 
               current: table.getState().pagination.pageIndex + 1,
               pages: table.getPageCount(),
               defaultValue: `총 ${totalRows}건 / 페이지 ${table.getState().pagination.pageIndex + 1} / ${table.getPageCount()}` 
            })}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" tone="slate" size="sm" disabled={!table.getCanPreviousPage()} onPress={() => table.previousPage()}>
              {t('uikit.table.prev', { defaultValue: '이전' })}
            </Button>
            <Button variant="outline" tone="slate" size="sm" disabled={!table.getCanNextPage()} onPress={() => table.nextPage()}>
              {t('uikit.table.next', { defaultValue: '다음' })}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}