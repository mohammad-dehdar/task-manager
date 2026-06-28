export interface DashboardStats {
  totalTasks: number;
  completedToday: number;
  inProgress: number;
  overdue: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentTasks: RecentTask[];
  tasksByStatus: TasksByStatus;
  upcomingDeadlines: UpcomingTask[];
}

export interface RecentTask {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  updatedAt: string;
}

export interface TasksByStatus {
  todo: number;
  'in-progress': number;
  done: number;
}

export interface UpcomingTask {
  id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}
