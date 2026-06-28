import type { ReactNode } from 'react';

import { Skeleton } from '@/components/ui';
import { cn } from '@/utils';

import type { Column } from './types';

interface DataTableInternalProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyState?: ReactNode;
  onRowClick?: (row: T) => void;
}

function getCellValue<T>(row: T, column: Column<T>): ReactNode {
  if (typeof column.accessor === 'function') {
    return column.accessor(row);
  }
  return row[column.accessor] as ReactNode;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  isLoading,
  emptyState,
  onRowClick,
}: DataTableInternalProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
        <div className="bg-neutral-50 dark:bg-neutral-800 px-4 py-3">
          <div className="flex gap-4">
            {columns.map((_, i) => (
              <Skeleton key={i} width="auto" height="sm" className="flex-1" />
            ))}
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 border-t border-neutral-100 dark:border-neutral-700 px-4 py-3">
            {columns.map((_, j) => (
              <Skeleton key={j} width="auto" height="sm" className="flex-1" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 py-16">
        {emptyState || <p className="text-sm text-neutral-500 dark:text-neutral-400">No data available</p>}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
      <table className="w-full">
        <thead>
          <tr className="bg-neutral-50 dark:bg-neutral-800 text-left text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {columns.map((col, index) => (
              <th key={index} className={cn('px-4 py-3', col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                'border-t border-neutral-100 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-200',
                onRowClick && 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors',
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={cn('px-4 py-3', col.className)}>
                  {col.cell ? col.cell(row) : getCellValue(row, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}