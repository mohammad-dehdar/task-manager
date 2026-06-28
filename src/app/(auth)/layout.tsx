import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4 transition-colors">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-800 p-8 shadow-sm border border-neutral-200 dark:border-neutral-700">
        {children}
      </div>
    </div>
  );
}