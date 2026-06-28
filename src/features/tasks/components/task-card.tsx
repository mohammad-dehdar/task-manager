'use client';

import { MoreHorizontal, Calendar, Trash2, Edit } from 'lucide-react';

import { Badge, Dropdown, type BadgeColor } from '@/components/ui';
import { cn } from '@/utils';

import { PRIORITY_MAP, STATUS_MAP, STATUS_OPTIONS } from '../constants';
import type { Task, TaskStatus } from '../types';

interface TaskCardProps {
  task: Task;
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

export function TaskCard({ task, onStatusChange, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="group flex items-start gap-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4 transition-all hover:shadow-sm">
      
      <select
        value={task.status}
        onChange={(e) => onStatusChange?.(task.id, e.target.value as TaskStatus)}
        className="mt-0.5 text-xs rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 px-1 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500 flex-shrink-0"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className={cn(
              'text-sm font-medium text-neutral-800 dark:text-neutral-100 truncate',
              task.status === 'done' && 'line-through text-neutral-400 dark:text-neutral-500',
            )}
          >
            {task.title}
          </h3>
        </div>

        {task.projectName && (
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{task.projectName}</p>
        )}

        <div className="mt-2 flex items-center gap-2">
          <Badge color={PRIORITY_MAP[task.priority] as BadgeColor} size="sm">
            {task.priority}
          </Badge>
          <Badge color={STATUS_MAP[task.status] as BadgeColor} size="sm">
            {task.status}
          </Badge>
          {task.dueDate && (
            <span className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
              <Calendar size={12} />
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <Dropdown
        trigger={
          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
            <MoreHorizontal size={16} className="text-neutral-400 dark:text-neutral-500" />
          </button>
        }
        items={[
          {
            label: 'Edit',
            icon: <Edit size={14} />,
            onClick: () => onEdit?.(task),
          },
          {
            label: 'Delete',
            icon: <Trash2 size={14} />,
            onClick: () => onDelete?.(task),
            destructive: true,
          },
        ]}
        position="bottom-end"
      />
    </div>
  );
}