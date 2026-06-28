import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { Project } from '../types';

interface ProjectsState {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  setProjects: (projects: Project[]) => void;
  selectProject: (project: Project | null) => void;
  setLoading: (v: boolean) => void;
}

export const useProjectsStore = create<ProjectsState>()(
  devtools(
    (set) => ({
      projects: [],
      selectedProject: null,
      isLoading: false,
      setProjects: (projects) => set({ projects }),
      selectProject: (project) => set({ selectedProject: project }),
      setLoading: (v) => set({ isLoading: v }),
    }),
    { name: 'projects-store' },
  ),
);
