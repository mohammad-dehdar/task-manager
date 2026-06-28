'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { projectsApi } from '../api';
import { useProjectsStore } from '../store';

export function useProjects() {
  const setProjects = useProjectsStore((s) => s.setProjects);
  const setLoading = useProjectsStore((s) => s.setLoading);

  const query = useQuery({
    queryKey: QUERY_KEYS.PROJECTS,
    queryFn: () => projectsApi.getAll(),
  });

  useEffect(() => {
    if (query.data) {
      setProjects(query.data);
    }
    setLoading(query.isLoading);
  }, [query.data, query.isLoading, setProjects, setLoading]);

  return query;
}
