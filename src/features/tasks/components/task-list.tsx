'use client';

import type { Task } from '../types';
import { TaskCard } from './task-card';
import { EmptyState } from '@/components/shared';
import { ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui';

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onStatusChange?: (id: string, status: Task['status']) => void;
  onCreateTask?: () => void;
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  onCreateTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<ClipboardList size={24} />}
        title="No tasks found"
        description="Create your first task to get started"
        action={
          <Button variant="fill" color="primary" onClick={onCreateTask}>
            Create Task
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
