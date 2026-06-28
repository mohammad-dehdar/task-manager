'use client';

import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
        <AlertTriangle size={32} />
      </div>
      <h1 className="text-4xl font-bold text-neutral-900">404</h1>
      <p className="mt-2 text-lg text-neutral-600">Page not found</p>
      <p className="mt-1 max-w-sm text-sm text-neutral-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/dashboard" className="mt-6">
        <Button variant="fill" color="primary">Go to Dashboard</Button>
      </Link>
    </div>
  );
}
