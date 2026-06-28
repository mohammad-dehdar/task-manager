'use client';

import { Skeleton } from '@/components/ui';

export default function TasksLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Skeleton width="auto" height="lg" className="h-8 w-32" />
        <Skeleton width="auto" height="sm" className="h-4 w-48" />
      </div>
      <div className="flex gap-3">
        <Skeleton width="auto" height="md" className="h-10 flex-1" />
        <Skeleton width="auto" height="md" className="h-10 w-32" />
        <Skeleton width="auto" height="md" className="h-10 w-32" />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" className="h-20" />
        ))}
      </div>
    </div>
  );
}
