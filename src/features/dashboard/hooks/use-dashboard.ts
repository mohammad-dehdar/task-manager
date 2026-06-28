'use client';

import { useQuery } from '@tanstack/react-query';

import { dashboardApi } from '../api';
import { DASHBOARD_QUERY_KEY } from '../constants';

export function useDashboard() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: () => dashboardApi.getData(),
  });
}
