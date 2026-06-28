'use client';

import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error-100 text-error-500">
        <AlertTriangle size={24} />
      </div>
      <h3 className="text-lg font-semibold text-neutral-800">Something went wrong</h3>
      <p className="mt-1 max-w-sm text-sm text-neutral-500">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button variant="outline" color="gray" onClick={reset} className="mt-4">
        Try again
      </Button>
    </div>
  );
}
