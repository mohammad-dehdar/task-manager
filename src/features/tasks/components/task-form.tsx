'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, Select, Textarea, Modal } from '@/components/ui';

import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../constants';
import { createTaskSchema, type CreateTaskSchema } from '../schema';
import type { Task } from '../types';
import { useCreateTask } from '../hooks/use-create-task';
import { useUpdateTask } from '../hooks/use-update-task';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
}

export function TaskForm({ open, onClose, task }: TaskFormProps) {
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const isEditing = !!task;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      projectId: '',
    },
  });

  useEffect(() => {
    if (open) {
      if (task) {
        reset({
          title: task.title,
          description: task.description || '',
          priority: task.priority,
          status: task.status || 'todo',
          dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
          projectId: task.projectId || '',
        });
      } else {
        reset({
          title: '',
          description: '',
          priority: 'medium',
          status: 'todo',
          dueDate: '',
          projectId: '',
        });
      }
    }
  }, [task, open, reset]);

  const onSubmit = (data: CreateTaskSchema) => {
    const dto = {
      ...data,
      dueDate: data.dueDate || undefined,
      projectId: data.projectId || undefined,
    };

    if (isEditing && task) {
      updateMutation.mutate(
        { id: task.id, dto },
        { onSuccess: onClose },
      );
    } else {
      createMutation.mutate(dto, { onSuccess: onClose });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Edit Task' : 'Create Task'}
      size="md"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" color="gray" onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button variant="fill" color="primary" type="submit" form="task-form" isLoading={isLoading}>
            {isEditing ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      }
    >
      <form id="task-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="Task title"
          state={errors.title ? 'error' : 'default'}
          hint={errors.title?.message}
          {...register('title')}
        />
        <Textarea
          label="Description"
          placeholder="Optional description"
          state={errors.description ? 'error' : 'default'}
          hint={errors.description?.message}
          {...register('description')}
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Priority"
            options={PRIORITY_OPTIONS}
            {...register('priority')}
          />
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            {...register('status')}
          />
        </div>
        <Input
          label="Due Date"
          type="date"
          {...register('dueDate')}
        />
      </form>
    </Modal>
  );
}