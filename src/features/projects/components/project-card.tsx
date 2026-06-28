'use client';

import { MoreHorizontal, Trash2, Edit, FolderKanban } from 'lucide-react';

import { Badge, Dropdown } from '@/components/ui';
import { cn } from '@/utils';

import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-4 w-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: project.color }}
          />
          <h3 className="text-sm font-semibold text-neutral-800">{project.name}</h3>
        </div>
        <Dropdown
          trigger={
            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-neutral-100">
              <MoreHorizontal size={16} className="text-neutral-400" />
            </button>
          }
          items={[
            { label: 'Edit', icon: <Edit size={14} />, onClick: () => onEdit?.(project) },
            { label: 'Delete', icon: <Trash2 size={14} />, onClick: () => onDelete?.(project), destructive: true },
          ]}
          position="bottom-end"
        />
      </div>

      {project.description && (
        <p className="mt-2 text-xs text-neutral-500 line-clamp-2">{project.description}</p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Badge color="neutral" size="sm">
          <FolderKanban size={12} className="mr-1" />
          {project.taskCount} tasks
        </Badge>
      </div>
    </div>
  );
}
