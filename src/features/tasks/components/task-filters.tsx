'use client';

import { Search, X } from 'lucide-react';

import { Input, Select } from '@/components/ui';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../constants';
import { useTasksStore } from '../store';
import type { TaskStatus, TaskPriority } from '../types';

export function TaskFilters() {
  const filters = useTasksStore((s) => s.filters);
  const setFilters = useTasksStore((s) => s.setFilters);
  const resetFilters = useTasksStore((s) => s.resetFilters);

  const hasFilters = filters.status || filters.priority || filters.search;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Search tasks..."
          value={filters.search || ''}
          onChange={(e) => setFilters({ search: e.target.value })}
          startIcon={<Search size={16} />}
          endIcon={
            filters.search ? (
              <button onClick={() => setFilters({ search: '' })}>
                <X size={14} />
              </button>
            ) : undefined
          }
        />
      </div>
      <Select
        placeholder="All Status"
        value={filters.status || ''}
        onChange={(e) =>
          setFilters({ status: (e.target.value as TaskStatus) || undefined })
        }
        options={STATUS_OPTIONS}
      />
      <Select
        placeholder="All Priority"
        value={filters.priority || ''}
        onChange={(e) =>
          setFilters({ priority: (e.target.value as TaskPriority) || undefined })
        }
        options={PRIORITY_OPTIONS}
      />
      {hasFilters && (
        <button
          onClick={resetFilters}
          className="text-sm text-primary-500 hover:text-primary-600"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
