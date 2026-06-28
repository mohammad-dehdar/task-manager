'use client';

import { Skeleton } from '@/components/ui';

export default function ProjectsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Skeleton width="auto" height="lg" className="h-8 w-40" />
        <Skeleton width="auto" height="sm" className="h-4 w-56" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" className="h-32" />
        ))}
      </div>
    </div>
  );
}
