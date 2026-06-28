'use client';

import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { projectsApi } from '../api';
import type { CreateProjectDto } from '../types';

export function useCreateProject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: CreateProjectDto) => projectsApi.create(dto),
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS });
    }
  }, [mutation.isSuccess, queryClient]);

  return mutation;
}
