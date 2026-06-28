'use client';

import { useState } from 'react';
import { Plus, FolderKanban } from 'lucide-react';

import { Button } from '@/components/ui';
import { PageHeader, ConfirmDialog, EmptyState } from '@/components/shared';

import { useProjects } from '../hooks';
import { useDeleteProject } from '../hooks/use-delete-project';
import type { Project } from '../types';
import { ProjectCard } from './project-card';
import { ProjectForm } from './project-form';

export function ProjectsPage() {
  const { data: projects = [], isLoading } = useProjects();
  const deleteMutation = useDeleteProject();

  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setEditingProject(null);
    setFormOpen(true);
  };

  const handleDelete = () => {
    if (deletingProject) {
      deleteMutation.mutate(deletingProject.id, {
        onSuccess: () => setDeletingProject(null),
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Projects"
        description="Organize your tasks into projects"
        actions={
          <Button variant="fill" color="primary" startIcon={<Plus size={16} />} onClick={handleCreate}>
            New Project
          </Button>
        }
      />

      {projects.length === 0 && !isLoading ? (
        <EmptyState
          icon={<FolderKanban size={24} />}
          title="No projects yet"
          description="Create your first project to organize tasks"
          action={
            <Button variant="fill" color="primary" onClick={handleCreate}>
              Create Project
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={setDeletingProject}
            />
          ))}
        </div>
      )}

      <ProjectForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingProject(null); }}
        project={editingProject}
      />

      <ConfirmDialog
        isOpen={!!deletingProject}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${deletingProject?.name}"? Tasks in this project will not be deleted.`}
        isLoading={deleteMutation.isPending}
        confirmLabel="Delete"
        confirmColor="error"
      />
    </div>
  );
}
