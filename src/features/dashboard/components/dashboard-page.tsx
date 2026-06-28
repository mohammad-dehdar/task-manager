'use client';

import { ClipboardList, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

import { Skeleton } from '@/components/ui';
import { PageHeader } from '@/components/shared';

import { useDashboard } from '../hooks';
import { StatsCard } from './stats-card';
import { RecentTasks } from './recent-tasks';
import { TasksByStatusChart } from './tasks-by-status';
import { UpcomingDeadlines } from './upcoming-deadlines';

export function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Dashboard" description="Welcome back!" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height="lg" className="h-28" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height="lg" className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  const stats = data?.stats || { totalTasks: 0, completedToday: 0, inProgress: 0, overdue: 0 };
  const recentTasks = data?.recentTasks || [];
  const tasksByStatus = data?.tasksByStatus || { todo: 0, 'in-progress': 0, done: 0 };
  const upcomingDeadlines = data?.upcomingDeadlines || [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard" description="Welcome back! Here's your overview." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Tasks" value={stats.totalTasks} color="bg-primary-500" />
        <StatsCard label="Completed Today" value={stats.completedToday} color="bg-success-500" trend="up" trendValue="+12%" />
        <StatsCard label="In Progress" value={stats.inProgress} color="bg-info-500" />
        <StatsCard label="Overdue" value={stats.overdue} color="bg-error-500" trend={stats.overdue > 0 ? 'down' : undefined} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentTasks tasks={recentTasks} />
        <TasksByStatusChart data={tasksByStatus} />
        <UpcomingDeadlines tasks={upcomingDeadlines} />
      </div>
    </div>
  );
}
