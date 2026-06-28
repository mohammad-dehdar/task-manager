'use client';

import { useState } from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';

import { Button } from '@/components/ui';
import { PageHeader, ConfirmDialog } from '@/components/shared';

import { useTasks } from '../hooks';
import { useTasksStore } from '../store';
import type { Task } from '../types';
import { TaskFilters } from './task-filters';
import { TaskList } from './task-list';
import { TaskBoard } from './task-board';
import { TaskForm } from './task-form';
import { useDeleteTask } from '../hooks/use-delete-task';

export function TasksPage() {
  const filters = useTasksStore((s) => s.filters);
  const viewMode = useTasksStore((s) => s.viewMode);
  const setViewMode = useTasksStore((s) => s.setViewMode);

  const { data: tasks = [], isLoading } = useTasks(filters);
  const deleteMutation = useDeleteTask();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const handleDelete = () => {
    if (deletingTask) {
      deleteMutation.mutate(deletingTask.id, {
        onSuccess: () => setDeletingTask(null),
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tasks"
        description="Manage and track your tasks"
        actions={
          <Button variant="fill" color="primary" startIcon={<Plus size={16} />} onClick={handleCreate}>
            New Task
          </Button>
        }
      />

      <TaskFilters />

      <div className="flex justify-end">
        <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 ${viewMode === 'list' ? 'bg-neutral-100 text-neutral-800' : 'text-neutral-400 hover:text-neutral-600'}`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode('board')}
            className={`p-2 ${viewMode === 'board' ? 'bg-neutral-100 text-neutral-800' : 'text-neutral-400 hover:text-neutral-600'}`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={setDeletingTask}
          onCreateTask={handleCreate}
        />
      ) : (
        <TaskBoard
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={setDeletingTask}
        />
      )}

      <TaskForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingTask(null);
        }}
        task={editingTask}
      />

      <ConfirmDialog
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDelete}
        title="Delete Task"
        description={`Are you sure you want to delete "${deletingTask?.title}"? This action cannot be undone.`}
        isLoading={deleteMutation.isPending}
        confirmLabel="Delete"
        confirmColor="error"
      />
    </div>
  );
}
