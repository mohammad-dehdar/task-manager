'use client';

import type { Task, TaskStatus } from '../types';
import { TaskCard } from './task-card';

interface TaskBoardProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onStatusChange?: (id: string, status: TaskStatus) => void;
}

const COLUMNS: { status: TaskStatus; label: string; color: string }[] = [
  { status: 'todo', label: 'To Do', color: 'bg-neutral-100 dark:bg-neutral-800' },
  { status: 'in-progress', label: 'In Progress', color: 'bg-info-50 dark:bg-info-900/30' },
  { status: 'done', label: 'Done', color: 'bg-success-50 dark:bg-success-900/30' },
];

export function TaskBoard({ tasks, onEdit, onDelete, onStatusChange }: TaskBoardProps) {
  const grouped = COLUMNS.map((col) => ({
    ...col,
    tasks: tasks.filter((t) => t.status === col.status),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {grouped.map((col) => (
        <div key={col.status} className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{col.label}</h3>
            <span className="text-xs text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 rounded-full">
              {col.tasks.length}
            </span>
          </div>
          <div className={`flex flex-col gap-2 rounded-xl p-2 min-h-[200px] ${col.color}`}>
            {col.tasks.length === 0 ? (
              <div className="flex items-center justify-center h-24 text-xs text-neutral-400 dark:text-neutral-500">
                No tasks
              </div>
            ) : (
              col.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
