import { api } from '@/utils';

import type { Project, CreateProjectDto, UpdateProjectDto } from '../types';

export const projectsApi = {
  getAll: () =>
    api.get<Project[]>('/projects').then((r) => r.data),

  getById: (id: string) =>
    api.get<Project>(`/projects/${id}`).then((r) => r.data),

  create: (dto: CreateProjectDto) =>
    api.post<Project>('/projects', dto).then((r) => r.data),

  update: (id: string, dto: UpdateProjectDto) =>
    api.patch<Project>(`/projects/${id}`, dto).then((r) => r.data),

  delete: (id: string) =>
    api.delete(`/projects/${id}`),
};
