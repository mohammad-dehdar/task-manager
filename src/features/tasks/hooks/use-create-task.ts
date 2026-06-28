'use client';

import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { tasksApi } from '../api';
import type { CreateTaskDto } from '../types';

export function useCreateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: CreateTaskDto) => tasksApi.create(dto),
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    }
  }, [mutation.isSuccess, queryClient]);

  return mutation;
}
