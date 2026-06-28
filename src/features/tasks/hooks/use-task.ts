'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { tasksApi } from '../api';

export function useTask(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.TASK(id),
    queryFn: () => tasksApi.getById(id),
    enabled: !!id,
  });
}
