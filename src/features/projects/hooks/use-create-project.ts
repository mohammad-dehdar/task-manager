'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { projectsApi } from '../api';
import type { CreateProjectDto } from '../types';

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateProjectDto) => projectsApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS });
    },
  });
}
