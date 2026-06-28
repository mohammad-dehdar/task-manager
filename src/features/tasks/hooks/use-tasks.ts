'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { tasksApi } from '../api';
import { useTasksStore } from '../store';
import type { TaskFilter } from '../types';

export function useTasks(filters?: TaskFilter) {
  const setTasks = useTasksStore((s) => s.setTasks);
  const setLoading = useTasksStore((s) => s.setLoading);

  const params: Record<string, string> = {};
  if (filters?.status) params.status = filters.status;
  if (filters?.priority) params.priority = filters.priority;
  if (filters?.projectId) params.projectId = filters.projectId;
  if (filters?.search) params.search = filters.search;

  return useQuery({
    queryKey: [QUERY_KEYS.TASKS, filters],
    queryFn: () => tasksApi.getAll(Object.keys(params).length ? params : undefined),
    onSuccess: (data) => {
      setTasks(data);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}
