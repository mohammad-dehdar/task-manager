'use client';

import { useState } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-neutral-800">{label}</p>
        {description && <p className="text-xs text-neutral-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-primary-500' : 'bg-neutral-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export function NotificationsTab() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskAssignments: true,
    dueDateReminders: true,
    weeklyDigest: false,
  });

  const update = (key: keyof typeof settings) => (value: boolean) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-col gap-2 divide-y divide-neutral-100">
      <Toggle
        label="Email Notifications"
        description="Receive notifications via email"
        checked={settings.emailNotifications}
        onChange={update('emailNotifications')}
      />
      <Toggle
        label="Push Notifications"
        description="Receive push notifications in browser"
        checked={settings.pushNotifications}
        onChange={update('pushNotifications')}
      />
      <Toggle
        label="Task Assignments"
        description="Get notified when a task is assigned to you"
        checked={settings.taskAssignments}
        onChange={update('taskAssignments')}
      />
      <Toggle
        label="Due Date Reminders"
        description="Get reminded before task deadlines"
        checked={settings.dueDateReminders}
        onChange={update('dueDateReminders')}
      />
      <Toggle
        label="Weekly Digest"
        description="Receive a weekly summary of your tasks"
        checked={settings.weeklyDigest}
        onChange={update('weeklyDigest')}
      />
    </div>
  );
}
