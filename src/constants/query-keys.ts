export const QUERY_KEYS = {
  TASKS: ['tasks'] as const,
  TASK: (id: string) => ['tasks', id] as const,
  PROJECTS: ['projects'] as const,
  PROJECT: (id: string) => ['projects', id] as const,
  USER: ['user'] as const,
  DASHBOARD: ['dashboard'] as const,
} as const;