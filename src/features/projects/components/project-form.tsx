'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, Textarea, Modal } from '@/components/ui';

import { PROJECT_COLORS } from '../constants';
import { createProjectSchema, type CreateProjectSchema } from '../schema';
import type { Project } from '../types';
import { useCreateProject } from '../hooks/use-create-project';
import { useUpdateProject } from '../hooks/use-update-project';

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  project?: Project | null;
}

export function ProjectForm({ open, onClose, project }: ProjectFormProps) {
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const isEditing = !!project;
  const [selectedColor, setSelectedColor] = useState(PROJECT_COLORS[0].value);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: '', description: '', color: PROJECT_COLORS[0].value },
  });

  useEffect(() => {
    if (project) {
      reset({ name: project.name, description: project.description || '', color: project.color });
      setSelectedColor(project.color);
    } else {
      reset({ name: '', description: '', color: PROJECT_COLORS[0].value });
      setSelectedColor(PROJECT_COLORS[0].value);
    }
  }, [project, reset]);

  const onSubmit = (data: CreateProjectSchema) => {
    const dto = { ...data, color: selectedColor };
    if (isEditing && project) {
      updateMutation.mutate({ id: project.id, dto }, { onSuccess: onClose });
    } else {
      createMutation.mutate(dto, { onSuccess: onClose });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Edit Project' : 'Create Project'}
      size="sm"
      footer={
        <div className="flex gap-3">
          <Button variant="outline" color="gray" onClick={onClose} isDisabled={isLoading}>Cancel</Button>
          <Button variant="fill" color="primary" type="submit" form="project-form" isLoading={isLoading}>
            {isEditing ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      }
    >
      <form id="project-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Name"
          placeholder="Project name"
          state={errors.name ? 'error' : 'default'}
          hint={errors.name?.message}
          {...register('name')}
        />
        <Textarea
          label="Description"
          placeholder="Optional description"
          {...register('description')}
        />
        <div>
          <label className="input-label">Color</label>
          <div className="flex gap-2 mt-2">
            {PROJECT_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setSelectedColor(c.value)}
                className={`h-7 w-7 rounded-full transition-all ${selectedColor === c.value ? 'ring-2 ring-offset-2 ring-neutral-400' : ''}`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
