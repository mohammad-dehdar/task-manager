'use client';

import { PageHeader } from '@/components/shared';

export function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" description="Manage your preferences" />
      <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center">
        <p className="text-sm text-neutral-500">Settings coming soon</p>
      </div>
    </div>
  );
}
