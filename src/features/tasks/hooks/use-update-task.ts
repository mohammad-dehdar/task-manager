'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { tasksApi } from '../api';
import type { Task, UpdateTaskDto } from '../types';

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) =>
      tasksApi.update(id, dto),

    onMutate: async ({ id, dto }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.TASKS });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(QUERY_KEYS.TASKS);

      // Optimistically update the cache
      queryClient.setQueryData<Task[]>(QUERY_KEYS.TASKS, (old) =>
        old?.map((t) => (t.id === id ? { ...t, ...dto } : t)) ?? []
      );

      return { previousTasks };
    },

    onError: (_err, _vars, context) => {
      // Rollback on error
      if (context?.previousTasks) {
        queryClient.setQueryData(QUERY_KEYS.TASKS, context.previousTasks);
      }
    },

    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
  });

  return mutation;
}