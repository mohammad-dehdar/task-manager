'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { tasksApi } from '../api';
import type { Task, UpdateTaskDto } from '../types';

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) =>
      tasksApi.update(id, dto),

    onMutate: async ({ id, dto }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.TASKS });
      const previousTasks = queryClient.getQueryData<Task[]>(QUERY_KEYS.TASKS);
      queryClient.setQueryData<Task[]>(QUERY_KEYS.TASKS, (old) =>
        old?.map((t) => (t.id === id ? { ...t, ...dto } : t)) ?? []
      );
      return { previousTasks };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(QUERY_KEYS.TASKS, context.previousTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
  });
}