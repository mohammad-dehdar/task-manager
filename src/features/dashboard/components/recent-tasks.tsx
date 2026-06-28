import { Badge, type BadgeColor } from '@/components/ui';

import { STATUS_MAP } from '@/features/tasks/constants';
import type { RecentTask } from '../types';

interface RecentTasksProps {
  tasks: RecentTask[];
}

export function RecentTasks({ tasks }: RecentTasksProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-neutral-800 mb-3">Recent Tasks</h3>
        <p className="text-sm text-neutral-500">No recent tasks</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-neutral-800 mb-3">Recent Tasks</h3>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
            <span className="text-sm text-neutral-700 truncate">{task.title}</span>
            <Badge color={STATUS_MAP[task.status] as BadgeColor} size="sm">
              {task.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
