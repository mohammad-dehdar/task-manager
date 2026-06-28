'use client';

import { Skeleton } from '@/components/ui';

export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Skeleton width="auto" height="lg" className="h-8 w-36" />
        <Skeleton width="auto" height="sm" className="h-4 w-44" />
      </div>
      <div className="flex gap-4 border-b border-neutral-200 pb-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} width="auto" height="sm" className="h-5 w-20" />
        ))}
      </div>
      <div className="flex flex-col gap-4 max-w-2xl">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} width="auto" height="md" className="h-12" />
        ))}
      </div>
    </div>
  );
}
