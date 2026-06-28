import { api } from '@/utils';

import type { Task, CreateTaskDto, UpdateTaskDto } from '../types';

export const tasksApi = {
  getAll: (params?: Record<string, string>) =>
    api.get<Task[]>('/tasks', { params }).then((r) => r.data),

  getById: (id: string) =>
    api.get<Task>(`/tasks/${id}`).then((r) => r.data),

  create: (dto: CreateTaskDto) =>
    api.post<Task>('/tasks', dto).then((r) => r.data),

  update: (id: string, dto: UpdateTaskDto) =>
    api.patch<Task>(`/tasks/${id}`, dto).then((r) => r.data),

  delete: (id: string) =>
    api.delete(`/tasks/${id}`),

  updateStatus: (id: string, status: Task['status']) =>
    api.patch<Task>(`/tasks/${id}`, { status }).then((r) => r.data),
};
