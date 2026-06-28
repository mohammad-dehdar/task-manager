import { api } from '@/utils';

import type { DashboardData } from '../types';

export const dashboardApi = {
  getData: () =>
    api.get<DashboardData>('/dashboard').then((r) => r.data),
};
