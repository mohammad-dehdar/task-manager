import { Calendar } from 'lucide-react';

import { Badge, type BadgeColor } from '@/components/ui';

import { PRIORITY_MAP } from '@/features/tasks/constants';
import type { UpcomingTask } from '../types';

interface UpcomingDeadlinesProps {
  tasks: UpcomingTask[];
}

export function UpcomingDeadlines({ tasks }: UpcomingDeadlinesProps) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-5">
      <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-3">Upcoming Deadlines</h3>

      {tasks.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">No upcoming deadlines</p>
      ) : (
        <div className="flex flex-col gap-2">
          {tasks.map((task) => {
            const daysUntil = Math.ceil(
              (new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
            );
            const isUrgent = daysUntil <= 2;

            return (
              <div key={task.id} className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                <div className="flex items-center gap-2 min-w-0">
                  <Calendar size={14} className={isUrgent ? 'text-error-500' : 'text-neutral-400 dark:text-neutral-500'} />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300 truncate">{task.title}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge color={PRIORITY_MAP[task.priority] as BadgeColor} size="sm">
                    {task.priority}
                  </Badge>
                  <span className={`text-xs ${isUrgent ? 'text-error-600 font-medium' : 'text-neutral-500 dark:text-neutral-400'}`}>
                    {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
