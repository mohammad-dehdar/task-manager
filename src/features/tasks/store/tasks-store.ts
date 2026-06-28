import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { Task, TaskFilter, TaskStatus } from '../types';

interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  viewMode: 'list' | 'board';
  filters: TaskFilter;
  setTasks: (tasks: Task[]) => void;
  selectTask: (task: Task | null) => void;
  setLoading: (v: boolean) => void;
  setViewMode: (mode: 'list' | 'board') => void;
  setFilters: (filters: TaskFilter) => void;
  resetFilters: () => void;
}

const defaultFilters: TaskFilter = {
  status: undefined,
  priority: undefined,
  projectId: undefined,
  search: '',
};

export const useTasksStore = create<TasksState>()(
  devtools(
    (set) => ({
      tasks: [],
      selectedTask: null,
      isLoading: false,
      viewMode: 'list',
      filters: defaultFilters,
      setTasks: (tasks) => set({ tasks }),
      selectTask: (task) => set({ selectedTask: task }),
      setLoading: (v) => set({ isLoading: v }),
      setViewMode: (viewMode) => set({ viewMode }),
      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
      resetFilters: () => set({ filters: defaultFilters }),
    }),
    { name: 'tasks-store' },
  ),
);
