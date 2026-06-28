'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { projectsApi } from '../api';
import { useProjectsStore } from '../store';

export function useProjects() {
  const setProjects = useProjectsStore((s) => s.setProjects);
  const setLoading = useProjectsStore((s) => s.setLoading);

  return useQuery({
    queryKey: QUERY_KEYS.PROJECTS,
    queryFn: () => projectsApi.getAll(),
    onSuccess: (data) => {
      setProjects(data);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}
