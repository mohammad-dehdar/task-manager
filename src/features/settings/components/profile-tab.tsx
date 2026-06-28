'use client';

import { Camera } from 'lucide-react';

import { Button, Input, Avatar } from '@/components/ui';
import { useAuthStore } from '@/features/auth/store';

export function ProfileTab() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar size="xl" fallback={user?.name?.charAt(0) || 'U'} src={user?.avatar} />
          <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white shadow-sm hover:bg-primary-600 transition-colors">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-800">{user?.name || 'User'}</p>
          <p className="text-xs text-neutral-500">{user?.email || 'user@example.com'}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Input label="Name" defaultValue={user?.name || ''} placeholder="Your name" />
        <Input label="Email" type="email" defaultValue={user?.email || ''} placeholder="you@example.com" />
        <div>
          <Button variant="fill" color="primary">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
